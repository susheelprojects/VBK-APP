import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  context: { params: Promise<{ section: string }> }
) {
  // ⭐ FIX: unwrap params (Next.js 14 requirement)
  const { section } = await context.params;

  const folderPath = path.join(process.cwd(), "app", "gallery-images", section);

  if (!fs.existsSync(folderPath)) {
    return NextResponse.json({ images: [] });
  }

  const files = fs.readdirSync(folderPath);

  const images = files.map((file) => `/gallery/${section}/${file}`);

  return NextResponse.json({ images });
}
