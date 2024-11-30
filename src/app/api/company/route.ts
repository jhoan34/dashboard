import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const data = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Crea el objeto de datos validado y asegurado
    const companyData = {
      userId,
      ...data
    };

    // Crea la compañía en la base de datos
    const company = await db.company.create({
      data: companyData,
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

