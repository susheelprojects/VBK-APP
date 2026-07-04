import Image from "next/image";
import { gallerySections } from "./sections";

async function getImages(folder: string): Promise<string[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/gallery/${folder}`, {
    cache: "no-store",
  });

  // If folder doesn't exist → API returns HTML → avoid JSON.parse crash
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return []; // return empty instead of crashing
  }

  const data = await res.json();
  return (data.images as string[]) || [];
}

export default async function Page() {
  const galleryData = await Promise.all(
    gallerySections.map(async (section) => {
      const images = await getImages(section.folder);
      return { ...section, images };
    })
  );

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Gallery</h1>

      {galleryData.map((section) => (
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

          {section.images.length === 0 && (
            <p style={{ opacity: 0.6 }}>
              No images found for this section.
            </p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {section.images.map((src: string) => (
              <div
                key={src}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                }}
              >
                <Image
                  src={src}
                  alt={section.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
