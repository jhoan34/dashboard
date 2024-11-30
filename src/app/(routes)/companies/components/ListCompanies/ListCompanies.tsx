import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./data.table";
import { columns } from "./columns";
import { Company } from "@prisma/client";

export async function ListCompanies() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const companies: Company[] = await db.company.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (companies.length === 0 || !companies) {
        console.log("No companies found");
    }

    return (
        <div className=" ">
            <DataTable columns={columns} data={companies} />
        </div>
    );
}

