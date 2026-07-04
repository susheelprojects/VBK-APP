"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryClient({ galleryData }: { galleryData: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ padding: "20px" }}>
      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={selectedImage}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          />
        </div>
      )}

      {/* Gallery Sections */}
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
                  cursor: "zoom-in",
                }}
                onClick={() => setSelectedImage(src)}
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
