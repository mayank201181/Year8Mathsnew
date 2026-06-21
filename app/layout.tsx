import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import AppGate from "@/components/AppGate";

export const metadata: Metadata = {
  title: "Year 8 Maths Lab",
  description:
    "Year 8 Maths revision — illustrated guides, quizzes, full exam papers and AoPS-style problem solving. Cambridge Lower Secondary Stage 8.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Y8 Maths Lab",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppGate>{children}</AppGate>
        </StoreProvider>
      </body>
    </html>
  );
}
