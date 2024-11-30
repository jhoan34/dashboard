import { CustomIcon } from "@/components/customIcon"
import { BarChart } from "lucide-react"
import { GraphicSuscribers } from "../grapghicSuscbrips"

export function SalesDistribution () {
    return (
        <div className="shadow-sm bg-background rounded-lg p-5 ">
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={BarChart}/>
                <p className="text-xl">Sales Distributor</p>
            </div>  
            <GraphicSuscribers/>
        </div>
    )
}
