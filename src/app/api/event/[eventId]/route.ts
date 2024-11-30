import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const eventId = url.pathname.split("/")[3]; // Asegúrate de que el id esté en la posición correcta
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