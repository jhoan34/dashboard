import { Info } from "lucide-react";
import { CustomTooTipProps } from "./customToolTip.type";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export function CustomToolTips(props : CustomTooTipProps){
    const {content} = props;
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><Info strokeWidth={1} className="h-5 w-5 " /></TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}