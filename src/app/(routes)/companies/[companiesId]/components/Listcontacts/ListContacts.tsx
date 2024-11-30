import { ListContactsProps } from "./list.types";
import { redirect } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function ListContacts (props : ListContactsProps) {
    const {  company } = props
    const { userId } = await auth()

    if (!userId) {
        redirect("/")
    }

    const contacts = await db.contact.findMany({
        where : {
            company:{
                id : company.id
            }
        }
    })

    if(contacts.length === 0) {
        return <p>No contacts</p>
    }

    return (
        <div>
            <div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 ">
                <p>name</p>
                <p>role</p>
                <p className="text-right"> Contact</p>
            </div>
            {
                contacts.map(({id, name, role, email, phone}) => (
                    <div key={id}>
                        <div className="grid grid-cols-3 gap-x-3 items-center justify-between px-4 border-2 border-slate-400/20 p-2">
                            <p>{name}</p>
                            <p>{role}</p>
                            <div className="flex items-center gap-x-6 justify-end">
                                <a href={`telto: ${phone}`} target="_blank">
                                    <Phone className="w-5 h-5" />
                                </a>
                                <a href={`mailto: ${email}`} target="_blank">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        <Separator className="my-3" />
                    </div>
                ))
            }
        </div>
    )
}