import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Forward the request to the Python FastAPI Backend
    // Ensure your FastAPI is running on port 8000
    const fastApiResponse = await fetch("http://127.0.0.1:8000/chat-with-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // 2. Handle errors from the Python backend
    if (!fastApiResponse.ok) {
      const errorText = await fastApiResponse.text();
      return NextResponse.json(
        { error: `FastAPI Error: ${errorText}` },
        { status: fastApiResponse.status }
      );
    }

    // 3. Return the successful response to the frontend
    const data = await fastApiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Next.js API Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error - Could not reach Python Backend" },
      { status: 500 }
    );
  }
}