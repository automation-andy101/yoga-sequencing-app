import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import SavedClass from "@/lib/models/SavedClass";

type RouteProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    request: Request,
    { params }: RouteProps
) {
    try {
        const { id } = await params;

        await connectDB();

        const body = await request.json();

        const updatedSavedClass = await SavedClass.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json({
            success: true,
            data: updatedSavedClass,
        });
    } catch (error) {
        console.error("PUT /api/saved-classes/[id] error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update saved class",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: RouteProps
) {
    try {
        const { id } = await params;

        await connectDB();

        await SavedClass.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("DELETE /api/saved-classes/[id] error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete saved class",
            },
            { status: 500 }
        );
    }
}