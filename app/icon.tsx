// Browser-tab icon: a rounded indigo → violet square with a bold white π.
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          borderRadius: 8,
        }}
      >
        <svg width={24} height={24} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 1 }}>
          <g fill="none" stroke="#ffffff" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 37 C 20 28 26 25 34 25 L 84 25" />
            <path d="M41 27 C 41 50 38 65 29 77" />
            <path d="M65 27 L 65 64 C 65 74 70 77 79 73" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
