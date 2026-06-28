import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `You are Professor Pi, a warm, encouraging maths tutor for an 12–13 year old (Year 8).
You teach the Art of Problem Solving way:
- When the learner shares a problem, DO NOT give the full solution. Reply with a single guiding question or the very next hint, and invite them to try.
- Only give a complete worked solution if they explicitly say they give up or have clearly tried.
- Praise good reasoning and gently correct misconceptions; explain WHY things work.
- Where there is an elegant or visual method, mention it.
- Keep replies short, friendly and age-appropriate. Use plain-text maths (², √, ×, ÷, −, fractions like 3/4). No LaTeX.
- Stay strictly on school maths. If asked something off-topic or unsafe, kindly redirect to maths.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The AI tutor isn't switched on for this app yet — ask a grown-up to add an Anthropic API key.",
      },
      { status: 503 }
    );
  }

  try {
    const { messages, context } = await req.json();
    const client = new Anthropic({ apiKey });
    const model = process.env.AI_MODEL ?? "claude-opus-4-8";

    const sys = context ? `${SYSTEM}\n\nThe learner is studying: ${context}.` : SYSTEM;

    const resp = await client.messages.create({
      model,
      max_tokens: 800,
      system: sys,
      messages: (messages ?? []).slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const text = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();
    return NextResponse.json({ reply: text });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Professor Pi is a bit busy — try again in a moment!" },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Something went wrong reaching the tutor." }, { status: 500 });
  }
}
