import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, query } = body;

    // Send the request to your FastAPI backend
    // Assuming FastAPI is running on port 8000
    const fastApiResponse = await fetch("http://127.0.0.1:8000/chat-with-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path, query }),
    });

    if (!fastApiResponse.ok) {
      const errorData = await fastApiResponse.json();
      return NextResponse.json(
        { error: errorData.detail || "FastAPI Error" },
        { status: fastApiResponse.status }
      );
    }

    const data = await fastApiResponse.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Next.js API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}