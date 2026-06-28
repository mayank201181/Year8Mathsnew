import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <div style={{ fontSize: 80, lineHeight: 1 }}>8</div>
        <div style={{ fontSize: 24, letterSpacing: 2 }}>MATHS</div>
      </div>
    ),
    { ...size }
  );
}
