import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST (req: Request) {
    try {
        
        const url = new URL(req.url);
        const idparacontact = url.pathname.split("/")[3]; // Asegúrate de que el id esté en la posición correcta
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unathorized" , { status: 401 });
        }

        const values = await req.json();
        
        if(typeof values !== "object" || values === null) {
            console.error("Request body is not an object or is null");
        }

        const company = await db.company.findUnique({
            where: {
                id: idparacontact,
            }
        });

        if (!company) {
            return new NextResponse("Company not found", { status: 404 });
        }

        const event = await db.event.create({
            data: {
                companyId : idparacontact,
                ...values
            }
        })

        return NextResponse.json(event);
    }catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }


}