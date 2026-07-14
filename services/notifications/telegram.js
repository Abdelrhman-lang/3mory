"use server";
export async function sendTelegramOrderAlert(orderData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram credentials missing in env");
    return;
  }

  const message = `
🔔 *New Order Received!*
----------------------------
📦 *Order ID:* #${orderData.id}
👤 *Email:* ${orderData.userEmail}
💰 *Total Price:* ${orderData.totalPrice} EGP
👤 *Phone Number:* ${orderData.phoneNumber}
----------------------------
🚀 Check your admin dashboard for details!
  `;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    const telegramResult = await res.json();
    console.log("🔴 Telegram API Response:", telegramResult);
  } catch (error) {
    console.error("Failed to send Telegram alert:", error);
  }
}
