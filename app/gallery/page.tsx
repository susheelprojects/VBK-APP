import sections from "./sections";
import GalleryClient from "./GalleryClient";

async function getImages(folder: string): Promise<string[]> {
  const res = await fetch(`https://vbk-app.vercel.app/api/gallery/${folder}`, {
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
    sections.map(async (section) => {
      const images = await getImages(section.folder);
      return { ...section, images };
    })
  );

  return <GalleryClient galleryData={galleryData} />;
}
