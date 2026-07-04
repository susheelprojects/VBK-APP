import { NextResponse } from "next/server";

let submissions: any[] = []; // temporary in-memory storage

export async function POST(req: Request) {
  try {
    const body = await req.json();

    submissions.push({
      timestamp: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json({ message: "Submitted successfully!" });
  } catch (err) {
    return NextResponse.json({
      message: "Error saving data",
      error: String(err),
    });
  }
}