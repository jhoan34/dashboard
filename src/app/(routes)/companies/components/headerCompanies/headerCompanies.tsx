"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { FormCreateCustomer } from "../FormCreatCustomer"


export function HeaderCompanies () {
    const [openModalCreate , setOpenModalCreate ] = useState(false)
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl"> List Companies</h2>
            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger>
                    <Button>Create Company</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px ">
                    <DialogHeader>
                        <DialogTitle>Create Company</DialogTitle>
                        <DialogDescription>create and configure your customer</DialogDescription>
                    </DialogHeader>

                    <FormCreateCustomer setOpenModalCreate={setOpenModalCreate}/>
                </DialogContent>
            </Dialog>
        </div>
    )
} 