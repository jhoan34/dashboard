import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HeaderCompanyIdPage } from "./components/header";
import { FooterComaniesIdPage } from "./components/footer";
import { CompaniesInformation } from "./components/companyInformation";

interface CompaniesIdPageProps {
    company: any; // Define this based on the actual company model
}

export default function CompaniesIdPage({ company }: CompaniesIdPageProps) {
    if (!company) {
        // If company data is missing, redirect
        return <div>Company not found</div>;
    }

    return (
        <div>
            <HeaderCompanyIdPage />
            <CompaniesInformation company={company} />
            <FooterComaniesIdPage company={company} />
        </div>
    );
}

// Use getServerSideProps for async data fetching
export async function getServerSideProps({ params }: { params: { companiesId: string } }) {
    const { companiesId } = params;

    // Authenticate user
    const { userId } = await auth();

    if (!userId) {
        return { redirect: { destination: "/login", permanent: false } };
    }

    // Fetch company data from the database
    const company = await db.company.findUnique({
        where: {
            id: companiesId,
            userId,
        },
    });

    // If company doesn't exist, redirect to the home page
    if (!company) {
        return { redirect: { destination: "/", permanent: false } };
    }

    // Pass company data as a prop to the page component
    return {
        props: {
            company,
        },
    };
}
