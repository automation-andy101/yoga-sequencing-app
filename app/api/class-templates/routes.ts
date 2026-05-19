import connectDB from "@/lib/db/db";
import ClassTemplate from "@/lib/models/ClassTemplate";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        await connectDB();

        const classTemplates = await ClassTemplate.find({}).lean();

        return NextResponse.json({
            success: true,
            data: classTemplates
        });

    } catch (error) {

        console.error("GET /api/class-templates error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch class templates",
            },
            { status: 500 }
        );
    }
}