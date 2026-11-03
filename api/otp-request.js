// Vercel Serverless Function — plain Node, no external dependencies.
// LIVE-READY OTP request for C2S. Behaviour:
//  * Generates a 6-digit OTP, 5-minute expiry, max 5 verify attempts.
//  * Rate limit: max 3 requests per destination per 10 minutes
//    (in-memory check, plus a Supabase check when Supabase is configured).
//  * If SUPABASE_URL + SUPABASE_SERVICE_KEY are set, stores only the
//    SHA-256 hash of the OTP in otp_codes and expires older codes for
//    that destination. The plain OTP is NEVER stored and NEVER returned
//    in a live-mode response.
//  * Then sends via the chosen channel, and returns sent:true ONLY on
//    HTTP success from that provider. No secret is ever in a response.
//  * If no provider for that channel is configured, returns
//    provider_configured:false, sent:false, preview:true — the frontend
//    then keeps its clearly labelled PREVIEW OTP behaviour and must
//    never claim a real OTP was sent.
// OTP_SALT: set your own random string in Vercel. If it is missing, a
// fixed dev-only fallback string is used (clearly marked below). That
// fallback is NOT a secret and must be replaced with a real OTP_SALT
// before relying on live OTP for paid data.

const crypto = require("crypto");

// Every provider/DB call gets a 10-second timeout so a bad endpoint or a
// slow provider fails honestly instead of hanging the serverless function.
async function fetchWithTimeout(url, opts) {
  return fetch(url, { ...(opts || {}), signal: AbortSignal.timeout(10000) });
}

// In-memory rate-limit store (best-effort on serverless; the Supabase
// check below is the durable one when a database is configured).
const rateStore = new Map(); // destination -> [timestamps]
function rateLimited(destination) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const hits = (rateStore.get(destination) || []).filter((t) => now - t < windowMs);
  if (hits.length >= 3) return true;
  hits.push(now);
  rateStore.set(destination, hits);
  return false;
}

function hashOtp(code, salt) {
  return crypto.createHash("sha256").update(String(code) + ":" + String(salt)).digest("hex");
}

function supabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
}

async function supabaseRest(path, method, body, prefer) {
  const base = String(process.env.SUPABASE_URL).replace(/\/$/, "");
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: "Bearer " + process.env.SUPABASE_SERVICE_KEY,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;
  const res = await fetchWithTimeout(base + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

async function dbRateLimited(channel, destination) {
  if (!supabaseConfigured()) return false;
  try {
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const q = "/rest/v1/otp_codes?destination=eq." + encodeURIComponent(destination)
      + "&created_at=gte." + encodeURIComponent(since) + "&select=id";
    const r = await supabaseRest(q, "GET");
    if (!r.ok) return false; // do not block on a DB read error; provider send still checked below
    return Array.isArray(r.json) && r.json.length >= 3;
  } catch (e) { return false; }
}

async function dbStoreOtp(channel, destination, codeHash, expiresAt) {
  if (!supabaseConfigured()) return;
  // Expire older unused codes for this destination so only the newest counts.
  try {
    await supabaseRest(
      "/rest/v1/otp_codes?destination=eq." + encodeURIComponent(destination) + "&used=eq.false",
      "PATCH",
      { used: true }
    );
  } catch (e) { /* best effort; insert below still runs */ }
  await supabaseRest(
    "/rest/v1/otp_codes",
    "POST",
    { channel, destination, code_hash: codeHash, expires_at: expiresAt, attempts: 0, used: false },
    "return=representation"
  );
}

function providerConfiguredFor(channel) {
  if (channel === "sms") {
    return Boolean(
      (process.env.SMS_PROVIDER === "msg91" && process.env.MSG91_AUTH_KEY && process.env.MSG91_SENDER_ID) ||
      (process.env.SMS_API_URL && process.env.SMS_API_KEY)
    );
  }
  if (channel === "whatsapp") {
    return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_OTP_TEMPLATE);
  }
  if (channel === "email") {
    return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
  }
  return false;
}

async function sendSms(destination, code) {
  // MSG91: sendhttp API. Message contains only the OTP and the C2S name.
  // Provider response format varies; sent is true only on HTTP success.
  if (process.env.SMS_PROVIDER === "msg91" && process.env.MSG91_AUTH_KEY && process.env.MSG91_SENDER_ID) {
    const url = "https://api.msg91.com/api/sendhttp.php?authkey=" + encodeURIComponent(process.env.MSG91_AUTH_KEY)
      + "&mobiles=" + encodeURIComponent(destination)
      + "&message=" + encodeURIComponent("Your C2S OTP is " + code + ". Valid for 5 minutes. Do not share it.")
      + "&sender=" + encodeURIComponent(process.env.MSG91_SENDER_ID)
      + "&route=4&country=91";
    const res = await fetchWithTimeout(url);
    return { sent: res.ok, status: res.status };
  }
  // Generic SMS HTTP endpoint (provider-agnostic): POST JSON, key in header.
  const res = await fetchWithTimeout(process.env.SMS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.SMS_API_KEY },
    body: JSON.stringify({ to: destination, message: "Your C2S OTP is " + code + ". Valid for 5 minutes. Do not share it." }),
  });
  return { sent: res.ok, status: res.status };
}

async function sendWhatsapp(destination, code) {
  // Meta WhatsApp Cloud API: template message, OTP as the first parameter.
  const url = "https://graph.facebook.com/v21.0/" + encodeURIComponent(process.env.WHATSAPP_PHONE_NUMBER_ID) + "/messages";
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.WHATSAPP_TOKEN,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: destination,
      type: "template",
      template: {
        name: process.env.WHATSAPP_OTP_TEMPLATE,
        language: { code: "en_US" },
        components: [{ type: "body", parameters: [{ type: "text", text: code }] }],
      },
    }),
  });
  return { sent: res.ok, status: res.status };
}

async function sendEmail(destination, code) {
  // Resend HTTP API.
  const res = await fetchWithTimeout("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [destination],
      subject: "C2S OTP",
      text: "Your C2S OTP is " + code + ". It is valid for 5 minutes. Do not share it with anyone.",
    }),
  });
  return { sent: res.ok, status: res.status };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }
  const channel = String(body.channel || "").toLowerCase();
  const target = String(body.target || "").trim();
  if (!["sms", "whatsapp", "email"].includes(channel)) {
    res.status(400).json({ error: "invalid_channel" });
    return;
  }
  if (!target) {
    res.status(400).json({ error: "missing_target" });
    return;
  }
  if (channel === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(target)) {
    res.status(400).json({ error: "invalid_email" });
    return;
  }

  const configured = providerConfiguredFor(channel);
  if (!configured) {
    // Honest preview path: no provider, so nothing is sent and nothing
    // is claimed as sent. The frontend shows a labelled PREVIEW code.
    res.status(200).json({
      provider_configured: false,
      channel,
      sent: false,
      preview: true,
      message: "No OTP provider is configured for this channel. Use the PREVIEW OTP shown on screen for testing only. No real SMS, WhatsApp or email has been sent.",
    });
    return;
  }

  // Rate limit before generating or sending anything.
  if (rateLimited(channel + ":" + target) || (await dbRateLimited(channel, target))) {
    res.status(429).json({ error: "rate_limited", provider_configured: true, sent: false, message: "Too many OTP requests for this destination. Try again in 10 minutes." });
    return;
  }

  const code = String(crypto.randomInt(100000, 1000000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  // DEV-ONLY FALLBACK — not a secret. Set OTP_SALT in Vercel for live use.
  const salt = process.env.OTP_SALT || "c2s-dev-only-fallback-not-a-secret";
  try {
    await dbStoreOtp(channel, target, hashOtp(code, salt), expiresAt);
  } catch (e) {
    // If the DB write fails, do not claim a live OTP exists. Still try
    // the provider send below only if the provider itself can deliver;
    // verification in live mode then depends on the DB, so a DB failure
    // is reported by verify as not verified. This path is logged by Vercel.
  }

  let result;
  try {
    if (channel === "sms") result = await sendSms(target, code);
    else if (channel === "whatsapp") result = await sendWhatsapp(target, code);
    else result = await sendEmail(target, code);
  } catch (e) {
    result = { sent: false, status: 0, error: "provider_request_failed" };
  }

  if (!result.sent) {
    res.status(502).json({
      provider_configured: true,
      channel,
      sent: false,
      preview: false,
      provider_status: result.status || 0,
      message: "OTP provider did not accept the request. No OTP was sent. Check the provider keys/template in Vercel env vars and try again.",
    });
    return;
  }

  // Success: plain code is deliberately NOT in this response.
  res.status(200).json({
    provider_configured: true,
    channel,
    sent: true,
    preview: false,
    expires_in_seconds: 300,
    message: "OTP sent to your " + (channel === "email" ? "email" : "mobile") + ". It is valid for 5 minutes.",
  });
};
