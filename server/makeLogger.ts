export async function logToMake(payload: any) {
  if (!process.env.MAKE_WEBHOOK_URL) {
    return; // Skip if webhook not configured
  }

  try {
    await fetch(process.env.MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("✅ Logged to Make.com");
  } catch (err) {
    console.error("❌ Make.com webhook failed:", err);
  }
}
