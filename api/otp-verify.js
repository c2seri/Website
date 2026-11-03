// Vercel Serverless Function — plain Node, no external dependencies.
// This build does NOT verify a real provider OTP, because no provider is
// connected yet. It reports provider status honestly; the frontend verifies
// the PREVIEW OTP locally in preview mode only. Never claim a real OTP
// was verified against a provider.
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { body = {}; }
  const channel = String(body.channel || "").toLowerCase();
  const envName = channel === "sms" ? "OTP_PROVIDER_SMS" : channel === "whatsapp" ? "OTP_PROVIDER_WHATSAPP" : "OTP_PROVIDER_EMAIL";
  const configured = Boolean(process.env[envName] && String(process.env[envName]).trim() !== "");
  res.status(200).json({
    provider_configured: configured,
    verified_by_provider: false,
    verify_locally_in_preview: !configured,
    message: configured
      ? "Provider env var is present, but live OTP verification is not yet implemented in this build."
      : "No OTP provider is configured. Verify the PREVIEW OTP locally in the browser for testing only."
  });
};
