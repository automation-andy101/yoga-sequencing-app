import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Pose from "@/lib/models/Pose";

export async function GET() {
    try {
        await connectDB();

        const poses = await Pose.find({}).lean();

        return NextResponse.json({
            success: true,
            data: poses,
        });
    } catch (error) {
        console.error("GET /api/poses error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch poses",
            },
            { status: 500 }
        );
    }
}
