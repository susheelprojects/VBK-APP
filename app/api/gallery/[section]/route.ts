import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  context: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await context.params;

    const folderPath = path.join(process.cwd(), "public", "gallery-images", section);

    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ images: [], error: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);

    const images = files.map((file) => `/gallery-images/${section}/${file}`);

    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
