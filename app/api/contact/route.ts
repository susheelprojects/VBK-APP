import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "data", "contact-submissions.csv");

    const row = [
      new Date().toISOString(),
      body.firstName,
      body.familyName,
      body.address,
      body.phone,
      body.colony,
      body.landmark,
      body.issue,
      body.division,
      body.constituency,
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        `Timestamp,First Name,Family Name,Address,Phone,Colony,Landmark,Issue,Division,Constituency\n${row}\n`
      );
    } else {
      fs.appendFileSync(filePath, `${row}\n`);
    }

    return NextResponse.json({ message: "Submitted successfully!" });
  } catch (err) {
    return NextResponse.json({ message: "Error saving data", error: String(err) });
  }
}
