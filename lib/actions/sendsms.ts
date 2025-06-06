export async function sendKavenegarSMS({
  receptor,
  message,
}: {
  receptor: string | string[];
  message: string;
}) {
  const apiKey = process.env.KAVENEGAR_API_KEY;
  const sender = process.env.KAVENEGAR_SENDER;

  if (!apiKey || !sender) {
    console.warn("Kavenegar API Key or Sender is missing. SMS will not be sent.");
    return null;
  }

  try {
    const receptors = Array.isArray(receptor) ? receptor.join(",") : receptor;

    const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`;

    const params = new URLSearchParams({
      receptor: receptors,
      token: message,
      template: "appointment", // You need to create this template in your Kavenegar panel
      type: "sms",
    });

    const res = await fetch(`${url}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!res.ok) {
      console.error(`Kavenegar API error: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (data.return?.status !== 200) {
      console.error(`Kavenegar failed: ${data.return?.message}`);
      return null;
    }

    return data.entries;
  } catch (error) {
    console.error("Error sending SMS:", error);
    return null;
  }
}
