
// Every provider/DB call gets a 10-second timeout so a bad endpoint or a
// slow provider fails honestly instead of hanging the serverless function.
async function fetchWithTimeout(url, opts) {
  return fetch(url, { ...(opts || {}), signal: AbortSignal.timeout(10000) });
}
// Vercel Serverless Function — plain Node, no external dependencies.
// Cashfree order creation for C2S (courses, library membership, payment links).
//  * Base URL from CASHFREE_ENV: 'sandbox' => https://sandbox.cashfree.com/pg,
//    'production' => https://api.cashfree.com/pg. Any other value defaults
//    to sandbox, so a mis-set env var cannot silently go to production.
//  * Headers x-client-id / x-client-secret come only from CASHFREE_APP_ID
//    / CASHFREE_SECRET_KEY env vars. They are never in this file and never
//    in a response.
//  * Returns payment_session_id ONLY on provider success. If keys are
//    missing, returns configured:false and never a fake session id.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }

  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!appId || !secret) {
    res.status(200).json({
      configured: false,
      message: "Cashfree is not configured. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in Vercel env vars before taking payments. No payment session was created.",
    });
    return;
  }

  const amount = Number(body.order_amount);
  if (!amount || amount <= 0) {
    res.status(400).json({ error: "invalid_amount" });
    return;
  }
  const mobile = String(body.customer_mobile || "").trim();
  const email = String(body.customer_email || "").trim();
  const name = String(body.customer_name || "C2S Student").trim();
  if (!mobile && !email) {
    res.status(400).json({ error: "missing_customer_contact" });
    return;
  }

  const env = String(process.env.CASHFREE_ENV || "sandbox").toLowerCase();
  const base = env === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
  const orderId = "C2S-" + Date.now() + "-" + Math.floor(Math.random() * 9000 + 1000);
  try {
    const r = await fetchWithTimeout(base + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": appId,
        "x-client-secret": secret,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: String(body.customer_id || ("C2S-" + (mobile || email))).slice(0, 64),
          customer_phone: mobile || undefined,
          customer_email: email || undefined,
          customer_name: name,
        },
      }),
    });
    const json = await r.json().catch(() => ({}));
    if (!r.ok || !json.payment_session_id) {
      res.status(502).json({ configured: true, error: "cashfree_error", provider_status: r.status, message: "Cashfree did not create an order. Check the Cashfree keys and environment in Vercel env vars." });
      return;
    }
    res.status(200).json({ configured: true, order_id: json.order_id || orderId, payment_session_id: json.payment_session_id });
  } catch (e) {
    res.status(502).json({ configured: true, error: "cashfree_request_failed", message: "Could not reach Cashfree. Try again." });
  }
};
