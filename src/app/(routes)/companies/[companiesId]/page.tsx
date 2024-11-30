import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HeaderCompanyIdPage } from "./components/header";
import { FooterComaniesIdPage } from "./components/footer";
import { CompaniesInformation } from "./components/companyInformation";

type tParams = Promise<{ companiesId: string }>;

export default async function CompaniesIdPage(props: { params: tParams }) {
    const companiesId = (await props.params).companiesId;

    const { userId } = await auth();
    // If no userId exists, redirect to login page
    if (!userId) {
        return redirect("/login");
    }

    // Fetch the company associated with the current user and companiesId
    const company = await db.company.findUnique({
        where: {
            id: companiesId,  // Query by companiesId directly
            userId,                   // Ensure the userId matches
        },
    });

    // If no company is found, redirect to home page or show a 404
    if (!company) {
        return redirect("/");  // Or use notFound() for 404
    }

    // Render the page with company data
    return (
        <div>
            <HeaderCompanyIdPage />
            <CompaniesInformation company={company} />
            <FooterComaniesIdPage company={company} />
        </div>
    );
}
