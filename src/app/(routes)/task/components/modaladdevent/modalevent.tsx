import { FormEvent } from "../formulario";
import { ModalEventsProps } from "./modal.types";
import { Dialog, DialogContent, DialogHeader , DialogTitle } from "@/components/ui/dialog";

export function ModalEvent(props : ModalEventsProps) {
    const {open, setOpen, setOnSaveEvent, companies, setNewEvent } = props
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ass a new event</DialogTitle>
                </DialogHeader>
                <FormEvent setNewEvent={setNewEvent} setOpen={setOpen} companies={companies} setOnSaveEvent={setOnSaveEvent} />
            </DialogContent>
        </Dialog>
    )
}