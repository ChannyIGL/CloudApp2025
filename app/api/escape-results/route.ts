import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST — Save escape result
export async function POST(req: Request) {
  console.time("POST /api/escape-results");

  try {
    const body = await req.json();
    const { timeRemaining, itemsCollected, notes } = body;

    const result = await prisma.escapeResult.create({
      data: {
        timeRemaining,
        itemsCollected,
        notes,
      },
    });

    console.timeEnd("POST /api/escape-results");

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.timeEnd("POST /api/escape-results");
    console.error("POST error:", error);

    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}

// GET — Fetch all escape results
export async function GET() {
  console.time("GET /api/escape-results");

  try {
    const results = await prisma.escapeResult.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.timeEnd("GET /api/escape-results");

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.timeEnd("GET /api/escape-results");
    console.error("GET error:", error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
