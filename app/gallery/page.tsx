import Image from "next/image";
import sections from "./sections";

async function getImages(folder: string) {
  // SERVER-SAFE base URL (no window)
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/gallery/${folder}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.images || [];
}

export default async function Page() {
  // Fetch all sections + images
  const galleryData = await Promise.all(
    sections.map(async (section) => {
      const images = await getImages(section.folder);
      return { ...section, images };
    })
  );

  return (
    <main style={{ padding: "20px" }}>
      <h1>Gallery</h1>

      {galleryData.map((section) => (
        <div key={section.folder} style={{ marginBottom: "40px" }}>
          <h2>{section.title}</h2>

          {section.images.length === 0 && (
            <p>No images found for this section.</p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {section.images.map((src) => (
              <div key={src} style={{ position: "relative", width: "100%", height: "200px" }}>
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