import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const instructions = formData.get("instructions") as string || "";

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // 1. Save file locally
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "temp_uploads");
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // 2. Call Python Backend
    // Your Python backend expects: { "path": "...", "instructions": "..." }
    const pythonApiUrl = "http://localhost:8000/clean-data";

    const pythonResponse = await fetch(pythonApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        path: filePath,
        instructions: instructions 
      }),
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      throw new Error(`Python Backend Error: ${pythonResponse.status} ${errorText}`);
    }

    const data = await pythonResponse.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}