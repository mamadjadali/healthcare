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
    throw new Error("Kavenegar API Key or Sender is missing");
  }

  const receptors = Array.isArray(receptor) ? receptor.join(",") : receptor;

  const url = `https://api.kavenegar.com/v1/${apiKey}/sms/send.json`;

  const params = new URLSearchParams({
    receptor: receptors,
    sender,
    message,
  });

  const res = await fetch(`${url}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Kavenegar API error: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.return.status !== 200) {
    throw new Error(`Kavenegar failed: ${data.return.message}`);
  }

  return data.entries; // contains info about each message sent
}
