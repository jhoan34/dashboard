import Image from "next/image";
import { CompanyInformationProps } from "./comInformation.type";
import { User } from "lucide-react";
import { CompanyForm } from "../companyform";
import { ListContacts } from "../Listcontacts";
import { NewContacts } from "../newcontacts";

export function CompaniesInformation (props : CompanyInformationProps) {
    const { company } = props
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg">
               <div className="p-4 px-5">
                   <Image src={company.profileImage ? company.profileImage : ""} width={50} height={50} alt="image" className="mb-2 rounded-lg"/>
               </div>
               <CompanyForm company={company}/>
            </div>
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className="w-6 h-6"/>
                        Contacts
                    </div>
                    <div>
                        <NewContacts />
                    </div>
                </div>
                <ListContacts company={company}/>
            </div>
        </div>
    )
}