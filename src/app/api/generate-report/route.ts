import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming form data from the frontend
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    // 2. Prepare the file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Define where to save the file temporarily
    // We create a "temp_uploads" folder in your project root
    const uploadDir = path.join(process.cwd(), "temp_uploads");

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Define the full absolute path for the file
    // e.g., D:\Neon-SaaS\temp_uploads\data.csv
    const filePath = path.join(uploadDir, file.name);

    // 4. Save the file to disk
    await writeFile(filePath, buffer);
    console.log(`File saved locally at: ${filePath}`);

    // 5. Call the Python FastAPI Backend
    // We send the *path* string, not the file itself
    const pythonApiUrl = "http://localhost:8000/generate-report"; // Ensure this port matches your Python script

    const pythonResponse = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: filePath,
        instructions: "Generate a detailed business report highlighting key insights.", // Default instructions
      }),
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      throw new Error(`Python Backend Error: ${pythonResponse.status} ${errorText}`);
    }

    const data = await pythonResponse.json();

    // 6. Return the Python response back to the Frontend
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}