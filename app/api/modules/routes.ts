import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Module from "@/lib/models/Module";

export async function GET() {
    try {
        await connectDB();

        const modules = await Module.find({}).lean();

        return NextResponse.json({
            success: true,
            data: modules,
        });
    } catch (error) {
        console.error("GET /api/modules error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch modules",
            },
            { status: 500 }
        );
    }
}