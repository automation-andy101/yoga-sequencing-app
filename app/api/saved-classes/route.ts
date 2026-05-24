import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import SavedClass from "@/lib/models/SavedClass";

export async function GET() {
  try {
    await connectDB();

    const savedClasses = await SavedClass.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: savedClasses,
    });
  } catch (error) {
    console.error("GET /api/saved-classes error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch saved classes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const savedClass = await SavedClass.create(body);

        return NextResponse.json(
        {
            success: true,
            data: savedClass,
        },
        { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/saved-classes error:", error);

        return NextResponse.json(
        {
            success: false,
            error: "Failed to save class",
        },
        { status: 500 }
        );
    }
}

