import { CustomIcon } from "@/components/customIcon"
import { List } from "lucide-react"
import { TableIntegration } from "../tableIntegration"

export function ListIntegrations () {
    return (
        <div className="shadow-sm bg-background rounded-lg p-5 flex-1">
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={List}/>
                <p className="text-xl">List Integrations</p>
            </div>
            <TableIntegration/>
        </div>
    )
}