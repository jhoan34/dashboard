"use client"
import { ArrowUpDown, MoreHorizontal , Pencil } from "lucide-react"
import { Company } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Company>[] = [
    {
        accessorKey : "profileImage",
        header: "Profile Image",
        cell : ({row}) => {
            const image = row.getValue("profileImage")
            return (
                <div className="px-3">
                    <Image src={typeof image === "string" ? image : "/images/company-icon.png"} width={40} height={40} alt="image" className="h-auto w-auto"/> 
                </div>
            )
        }
    },
    {
        accessorKey :"name",
        header : ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Company Name
                    <ArrowUpDown className="w-4 h-4 ml-2"/>
                </Button> 
            )
        },

    },
    {
        accessorKey: "cif", 
        header: "CIF",
    },
    {
        accessorKey: "phone",
        header  : "Phone",
    },
    {
        accessorKey : "country",
        header : "Country",
    },
    {
        accessorKey: "website",
        header : "Website",
    },
    {
        accessorKey : "actions",
        header: "Actions",
        cell : ({row}) => {
            const { id } = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4"/>    
                        </Button> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href={`/companies/${id}`}>
                            <Pencil className="w-4 h-4 mr-2 "/>
                            Edit
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }

]
