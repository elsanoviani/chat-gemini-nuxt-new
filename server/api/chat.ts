import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const sessionId = query.sessionId as string;
  const message = query.message as string;

  if (!sessionId || !message) {
    throw createError({ statusCode: 400, message: "sessionId & message are required" });
  }

  // simpan pesan user
  await prisma.message.create({
    data: { sessionId, role: "user", content: message }
  });

  // update judul session kalau masih default
  const session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
  if (session && session.title === "New Chat") {
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { title: message.substring(0, 3) }
    });
  }

  // SSE streaming
  const res = event.node.res;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContentStream(message);

    let fullText = "";

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        fullText += text;
        res.write(`data: ${text}\n\n`);
      }
    }

    // simpan balasan penuh ke DB
    await prisma.message.create({
      data: { sessionId, role: "assistant", content: fullText }
    });

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    res.write(`data: Error: ${err.message}\n\n`);
    res.end();
  }
});
