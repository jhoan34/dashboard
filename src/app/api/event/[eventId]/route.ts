import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {
    try {
        const { eventId } = params; // No need for await here
        const { userId } = await auth(); // Assuming auth() works synchronously, no need for await

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        } 

        const event = await db.event.delete({
            where: {
                id: eventId,
            }
        })

        return NextResponse.json(event);
        
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}