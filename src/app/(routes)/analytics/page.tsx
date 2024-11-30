import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { CompaniesChart } from "./components/companiesChar";



export default async function AnalyticsPage () {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const companies = await db.company.findMany({
        where : {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="bg-background shadow-md rounded-lg lg:p-4">
            <h2 className="text-2xl mb-4">Analytics Page</h2>
            <div>
                <CompaniesChart events={events} companies={companies}/>
            </div>
        </div>
    )
}