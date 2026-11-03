// Vercel Serverless Function — plain Node, no external dependencies.
// LIVE-READY OTP verify for C2S.
//  * If SUPABASE_URL + SUPABASE_SERVICE_KEY are set, verifies against
//    the latest unused otp_codes row for channel+destination: checks
//    expiry, compares the SHA-256 hash (code + OTP_SALT), marks the code
//    used on success, increments attempts on failure, and locks it after
//    5 failures. The plain code is never stored and never logged.
//  * If Supabase is not configured, returns verified_by_provider:false
//    and verify_locally_in_preview:true, as before — the frontend then
//    verifies the labelled PREVIEW OTP locally for testing only.
//  * Session note: this version returns only a simple session flag
//    (verified:true + destination/channel). A real signed session/JWT
//    should replace this flag before the site handles paid data; see
//    README.md. Until then, live OTP login is suitable for login and
//    test/library preview flows, and any payment must still be checked
//    in admin before it is treated as final.

const crypto = require("crypto");

// Every provider/DB call gets a 10-second timeout so a bad endpoint or a
// slow provider fails honestly instead of hanging the serverless function.
async function fetchWithTimeout(url, opts) {
  return fetch(url, { ...(opts || {}), signal: AbortSignal.timeout(10000) });
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

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }
  const channel = String(body.channel || "").toLowerCase();
  const target = String(body.target || "").trim();
  const code = String(body.code || "").trim();
  if (!["sms", "whatsapp", "email"].includes(channel) || !target || !code) {
    res.status(400).json({ error: "invalid_request", verified: false });
    return;
  }

  if (!supabaseConfigured()) {
    res.status(200).json({
      provider_configured: false,
      verified: false,
      verified_by_provider: false,
      verify_locally_in_preview: true,
      message: "No database is configured. Verify the PREVIEW OTP locally in the browser for testing only.",
    });
    return;
  }

  try {
    const q = "/rest/v1/otp_codes?channel=eq." + encodeURIComponent(channel)
      + "&destination=eq." + encodeURIComponent(target)
      + "&used=eq.false&order=created_at.desc&limit=1&select=id,code_hash,expires_at,attempts";
    const r = await supabaseRest(q, "GET");
    if (!r.ok || !Array.isArray(r.json) || r.json.length === 0) {
      res.status(200).json({ verified: false, verified_by_provider: true, error: "code_not_found_or_expired", message: "No active OTP found for this destination. Request a new OTP." });
      return;
    }
    const row = r.json[0];
    if (new Date(row.expires_at).getTime() < Date.now()) {
      await supabaseRest("/rest/v1/otp_codes?id=eq." + encodeURIComponent(row.id), "PATCH", { used: true });
      res.status(200).json({ verified: false, verified_by_provider: true, error: "code_expired", message: "OTP expired. Request a new OTP." });
      return;
    }
    if (Number(row.attempts) >= 5) {
      await supabaseRest("/rest/v1/otp_codes?id=eq." + encodeURIComponent(row.id), "PATCH", { used: true });
      res.status(200).json({ verified: false, verified_by_provider: true, error: "code_locked", message: "Too many failed attempts. Request a new OTP." });
      return;
    }
    // DEV-ONLY FALLBACK — not a secret. Must match OTP_SALT used at request time.
    const salt = process.env.OTP_SALT || "c2s-dev-only-fallback-not-a-secret";
    const ok = hashOtp(code, salt) === String(row.code_hash);
    if (!ok) {
      await supabaseRest("/rest/v1/otp_codes?id=eq." + encodeURIComponent(row.id), "PATCH", { attempts: Number(row.attempts) + 1 });
      res.status(200).json({ verified: false, verified_by_provider: true, error: "wrong_code", message: "Wrong OTP. Try again." });
      return;
    }
    await supabaseRest("/rest/v1/otp_codes?id=eq." + encodeURIComponent(row.id), "PATCH", { used: true, attempts: Number(row.attempts) + 1 });
    // Simple session flag only — see the header comment about JWT.
    res.status(200).json({
      verified: true,
      verified_by_provider: true,
      channel,
      destination: target,
      session: "verified",
      message: "OTP verified.",
    });
  } catch (e) {
    res.status(502).json({ verified: false, verified_by_provider: true, error: "database_error", message: "Could not verify OTP. Try again." });
  }
};
