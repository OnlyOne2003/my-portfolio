type NotifyOptions = { text: string };

type NotifyResult = { ok: boolean; detail?: string };

export async function notify(opts: NotifyOptions): Promise<NotifyResult> {
  const { text } = opts;

  // Prefer Telegram bot notification if configured
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const jsonBody = { chat_id: chatId, text, parse_mode: "HTML" };
    try {
      // Try JSON first
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });

      if (res.ok) {
        console.log("Telegram notification sent (json)");
        return { ok: true };
      }

      // Fallback to form-urlencoded
      const textResp = await res.text();
      console.warn("Telegram JSON notify failed:", res.status, textResp);

      const formBody = new URLSearchParams();
      formBody.append("chat_id", String(chatId));
      formBody.append("text", text);

      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (res.ok) {
        console.log("Telegram notification sent (form)");
        return { ok: true };
      }

      const textResp2 = await res.text();
      console.error(
        "Telegram notify failed (both json+form):",
        res.status,
        textResp2,
      );
      return {
        ok: false,
        detail: `telegram failed: ${res.status} ${textResp2}`,
      };
    } catch (err: any) {
      console.error("Telegram notify error:", err?.message || err);
      return { ok: false, detail: String(err?.message || err) };
    }
  }

  // Fallback: log to server console (visible in Vercel logs)
  console.log("Notification (fallback):", text);
  return { ok: false, detail: "fallback-logged" };
}

export default notify;
