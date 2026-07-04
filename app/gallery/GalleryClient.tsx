"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GalleryClient({ galleryData }: { galleryData: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentSectionImages, setCurrentSectionImages] = useState<string[]>([]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!selectedImage) return;

      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, currentIndex, currentSectionImages]);

  function openModal(images: string[], index: number) {
    setCurrentSectionImages(images);
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  }

  function goNext() {
    const nextIndex = (currentIndex + 1) % currentSectionImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(currentSectionImages[nextIndex]);
  }

  function goPrev() {
    const prevIndex =
      (currentIndex - 1 + currentSectionImages.length) %
      currentSectionImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(currentSectionImages[prevIndex]);
  }

  return (
    <main style={{ padding: "20px" }}>
      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
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
          }}
        >
          {/* Close Button (X) */}
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "40px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ×
          </div>

          {/* Left Arrow */}
          <div
            onClick={goPrev}
            style={{
              position: "absolute",
              left: "30px",
              fontSize: "50px",
              color: "white",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            ‹
          </div>

          {/* Image */}
          <img
            src={selectedImage}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          />

          {/* Right Arrow */}
          <div
            onClick={goNext}
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "50px",
              color: "white",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            ›
          </div>
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
            {section.images.map((src: string, index: number) => (
              <div
                key={src}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  cursor: "zoom-in",
                }}
                onClick={() => openModal(section.images, index)}
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
