import Image from "next/image";
import sections from "./sections";   // ✔ FIXED

async function getImages(folder: string): Promise<string[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/gallery/${folder}`, {
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return [];
  }

  const data = await res.json();
  return (data.images as string[]) || [];
}

export default async function Page() {
  const galleryData = await Promise.all(
    sections.map(async (section) => {   // ✔ FIXED
      const images = await getImages(section.folder);
      return { ...section, images };
    })
  );
