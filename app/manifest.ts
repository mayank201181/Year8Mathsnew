import type { MetadataRoute } from "next";

// Web app manifest: makes the Maths Lab installable ("Add to Home Screen").
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Year 8 Maths Lab",
    short_name: "Maths Lab",
    description: "Learn, practise and master Year 8 maths — problem-first lessons, auto-marked practice, skill drills and a daily mixed set.",
    lang: "en-GB",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f5f6fb",
    theme_color: "#4f46e5",
    categories: ["education", "kids"],
    icons: [
      { src: "/api/appicon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/api/appicon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/api/appicon?size=512&maskable=1", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
