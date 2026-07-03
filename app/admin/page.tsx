"use client";

import { useState } from "react";

export default function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const uploadImage = async () => {
    console.log("Upload button clicked");
    console.log("File state:", file);

    if (!file) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setMessage("Upload failed");
        return;
      }

      const data = await res.json();
      setMessage(`Uploaded: ${data.filename}`);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Image Upload</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          console.log("Selected file:", selectedFile);
          setFile(selectedFile || null);
        }}
        className="mb-4"
      />

      <button
        onClick={uploadImage}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Upload Image
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </main>
  );
}
