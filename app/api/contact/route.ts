import { notify } from "../../../lib/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // basic email validation
    const emailValid = typeof email === "string" && /\S+@\S+\.\S+/.test(email);
    if (!emailValid) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const notifyText = `New contact message from ${name} (${email})\n\n${message}`;

    // send notification (Telegram preferred, falls back to console)
    const result = await notify({ text: notifyText });

    // return notification status to help debugging
    return new Response(
      JSON.stringify({ ok: true, notified: result.ok, detail: result.detail }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );
  } catch (err: any) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
