import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "data", "contact-submissions.xlsx");

    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
      worksheet = workbook.Sheets["Submissions"];
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet);

    existingData.push({
      Timestamp: new Date().toISOString(),
      ...body,
    });

    const newSheet = XLSX.utils.json_to_sheet(existingData);
    workbook.Sheets["Submissions"] = newSheet;

    XLSX.writeFile(workbook, filePath);

    return NextResponse.json({ message: "Submitted successfully!" });
  } catch (err) {
    return NextResponse.json({ message: "Error saving data", error: String(err) });
  }
}
