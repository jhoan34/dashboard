"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FooterComaniesIdPageProps } from "./footer.types";
import { Trash } from "lucide-react";

export function FooterComaniesIdPage (props : FooterComaniesIdPageProps) {
    const {company} = props;
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/company/${company.id}`);
            toast({
                title: "Company deleted",
            })
            router.push("/companies");
            

        }catch (error) {
            toast({
                title: "Something went wrong",
            })
        }
    }
    return (
        <div className="flex justify-end mt-5">
            <Button onClick={handleDelete}>
               <Trash className="w-4 h-4 mr-2"/>
               Remove Company
            </Button>
        </div>
    )
}