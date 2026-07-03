export const dynamic = "force-dynamic";

import Image from "next/image";
import { gallerySections } from "./sections";

async function getImages(folder: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/gallery/${folder}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.images;
}

export default async function Page() {
  return (
    <main style={{ padding: "20px" }}>
      {await Promise.all(
        gallerySections.map(async (section) => {
          const images = await getImages(section.folder);

          if (!images || images.length === 0) return null;

          return (
            <div key={section.folder} style={{ marginBottom: "40px" }}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  marginTop: "40px",
                  borderLeft: "6px solid #ff6600",
                  paddingLeft: "12px",
                }}
              >
                {section.title}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                {images.map((src: string, i: number) => (
                  <Image
                    key={i}
                    src={src}
                    width={300}
                    height={200}
                    alt={section.title}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}
