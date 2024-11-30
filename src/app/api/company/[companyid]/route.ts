import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request) {
    try {
        const url = new URL(req.url);
        const companyid = url.pathname.split("/")[3]; // Asegúrate de que el id esté en la posición correcta
        const { userId } = await auth(); // Assuming auth() works synchronously, no need for await
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const company = await db.company.update({
            where: {
                id: companyid,
                userId
            },
            data: { 
                ...values
            }
        });

        if (!company) {
            return new NextResponse("Company not found", { status: 404 });
        }

        return NextResponse.json(company);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const eventId = url.pathname.split("/")[3]; // Asegúrate de que el id esté en la posición correcta
        const { userId } = await auth(); // Assuming auth() works synchronously, no need for await

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        } 

        const event = await db.company.delete({
            where: {
                id: eventId,
            }
        })

        return NextResponse.json(event);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        console.error(errorMessage, "879889789778997897878989897");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}