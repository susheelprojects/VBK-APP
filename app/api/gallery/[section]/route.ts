import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    const { section } = params;

    const folderPath = path.join(process.cwd(), "app", "gallery-images", section);

    console.log("📁 Checking folder:", folderPath);

    if (!fs.existsSync(folderPath)) {
      console.log("❌ Folder does NOT exist on Vercel");
      return NextResponse.json({ images: [], error: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);
    console.log("📸 Files found:", files);

    const images = files.map((file) => `/gallery-images/${section}/${file}`);

    return NextResponse.json({ images });
  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: String(err) });
  }
}
