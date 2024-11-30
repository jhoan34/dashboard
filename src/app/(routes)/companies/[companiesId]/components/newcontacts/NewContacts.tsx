"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Childnewconta_contactForm } from "../childnewconta_contactForm"

export function NewContacts () {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">New contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max--w-[625px]">
                <DialogHeader>
                    <DialogTitle>Add New contact</DialogTitle>
                    <DialogDescription>
                        Create your contacts to manage them in your company
                    </DialogDescription>
                </DialogHeader>
                <Childnewconta_contactForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}