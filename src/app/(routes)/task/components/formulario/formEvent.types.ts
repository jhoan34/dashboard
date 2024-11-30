import { Company } from "@prisma/client"

export type FormEventProps = {
   setNewEvent : React.Dispatch<React.SetStateAction<{eventName: string, companiesSelected: {name: string, id: string}}>>
   setOpen : React.Dispatch<React.SetStateAction<boolean>>
   companies : Company[]
   setOnSaveEvent : React.Dispatch<React.SetStateAction<boolean>>
}