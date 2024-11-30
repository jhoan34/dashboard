import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"  
import { dataAccordion } from "./accordion.data"

export function Acooirdion () {
    return (
        <div>
            <Accordion type="single" collapsible>
                {
                    dataAccordion.map((item) => (
                        <AccordionItem key={item.id} value={`item-${item.id}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    )
}