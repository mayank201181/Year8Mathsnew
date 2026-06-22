import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const size = Number(searchParams.get("size") ?? 512);
  const maskable = searchParams.get("maskable") === "1";
  const pad = maskable ? Math.round(size * 0.12) : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)",
          color: "white",
          fontWeight: 800,
          padding: pad,
        }}
      >
        <div style={{ fontSize: size * 0.42, lineHeight: 1 }}>8</div>
        <div style={{ fontSize: size * 0.14, letterSpacing: 2 }}>MATHS</div>
      </div>
    ),
    { width: size, height: size }
  );
}
