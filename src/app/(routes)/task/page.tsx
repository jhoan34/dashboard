import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { CalendarComponent } from "./components/calendar"

export default async function CalendarPage () {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const user = await db.company.findMany({
        where: {
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
        <div>
            <CalendarComponent companies={user} events={events} />
        </div>
    )
}