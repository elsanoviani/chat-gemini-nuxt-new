// server/utils/llm.ts
export async function sendMessageToGemini(messages: { role: string; content: string }[]) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = "https://api.google.com/gemini/v2.5/messages"; // contoh URL, ganti sesuai doc resmi

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    // data.outputText atau data.messages terserah API response
    return data.outputText || "No response from Gemini";
  } catch (err) {
    console.error("sendMessageToGemini error:", err);
    return "AI error";
  }
}
