import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  context: { params: { folder: string } }
) {
  try {
    const { folder } = context.params;

    const folderPath = path.join(
      process.cwd(),
      "public",
      "gallery-images",
      folder
    );

    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ images: [], error: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);

    const images = files.map(
      (file) => `/gallery-images/${folder}/${file}`
    );

    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
