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


// DELETE request handler
export async function DELETE(req: Request, { params }: { params: { companyid: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract companyid from params
    const { companyid } = params;

    // Check if company exists for the given user
    const company = await db.company.findUnique({
      where: {
        id: companyid,
        userId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Delete the company from the database
    await db.company.delete({
      where: {
        id: companyid,
      },
    });

    return new NextResponse("Company deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
