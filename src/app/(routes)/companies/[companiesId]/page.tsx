import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { HeaderCompanyIdPage } from "./components/header"
import { FooterComaniesIdPage } from "./components/footer"
import { CompaniesInformation } from "./components/companyInformation"

export default async function CompaniesIdPage ({params}: {params: {companiesId: string}}) {
    const { companiesId } = await params
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const company = await db.company.findUnique({
        where : {
            id : companiesId,
            userId
        },
        
    })

    if (!company) {
        redirect("/")
    }

    return (
        <div>
            <HeaderCompanyIdPage/>
            <CompaniesInformation company={company} />
            <FooterComaniesIdPage company={company}/>
        </div>
    )
}