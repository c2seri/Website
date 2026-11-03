// Vercel Serverless Function — plain Node, no external dependencies.
// Reads OTP provider env vars and reports honestly whether a provider is configured.
// This build does NOT send a real SMS/WhatsApp/email. When no provider env var is set,
// it returns provider_configured:false and the frontend shows a clearly labelled
// PREVIEW OTP on screen for testing only. Never claim a real OTP was sent.
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }
  const channel = String(body.channel || "").toLowerCase();
  const target = String(body.target || "");
  if (!["sms", "whatsapp", "email"].includes(channel)) {
    res.status(400).json({ error: "invalid_channel" });
    return;
  }
  if (!target) {
    res.status(400).json({ error: "missing_target" });
    return;
  }
  const envName = channel === "sms" ? "OTP_PROVIDER_SMS" : channel === "whatsapp" ? "OTP_PROVIDER_WHATSAPP" : "OTP_PROVIDER_EMAIL";
  const configured = Boolean(process.env[envName] && String(process.env[envName]).trim() !== "");
  // Live sending is a separate integration step: even if an env var is present,
  // this function does not call any provider API, so sent is always false here.
  res.status(200).json({
    provider_configured: configured,
    channel: channel,
    sent: false,
    preview: !configured,
    message: configured
      ? "Provider env var is present, but live OTP sending is not yet implemented in this build. No real OTP has been sent."
      : "No OTP provider is configured. Use the PREVIEW OTP shown on screen for testing only. No real SMS, WhatsApp or email has been sent."
  });
};
