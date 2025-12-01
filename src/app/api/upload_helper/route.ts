import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to a temp folder in your project root
    const uploadDir = path.join(process.cwd(), "temp_uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename and save
    const sanitizedName = file.name.replace(/\s+/g, '_');
    const filePath = path.join(uploadDir, sanitizedName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
        success: true, 
        path: filePath 
    });

  } catch (error) {
    console.error("Upload helper error:", error);
    return NextResponse.json({ error: "Server upload failed" }, { status: 500 });
  }
}