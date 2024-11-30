import { Company } from "@prisma/client"
import React from "react"

export type ModalEventsProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setOnSaveEvent: React.Dispatch<React.SetStateAction<boolean>>
    companies : Company[]
    setNewEvent : React.Dispatch<React.SetStateAction<{eventName: string, companiesSelected: {name: string, id: string}}>>
}