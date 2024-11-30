"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import multiMonth from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarProps } from "./types";
import { DateSelectArg , EventContentArg, formatDate } from "@fullcalendar/core/index.js";
import axios from "axios";
import { formdate } from "@/lib/formdata";
import { toast } from "@/hooks/use-toast";
import { ModalEvent } from "../modaladdevent";
import { View } from "lucide-react";

export function CalendarComponent(props : CalendarProps) {
    const { companies, events } = props
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [onSaveEvent, setOnSaveEvent] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DateSelectArg>()
    const [newEvent, setNewEvent] = useState<any>({
        eventName: "",
        companiesSelected: {
            name: "",
            id: "",
        }
    })
    const handleDateClick = async (arg: DateSelectArg) => {
        
        setOpen(true)
        setSelectedItem(arg)
    }

    useEffect(() => {
        if (onSaveEvent && selectedItem?.view.calendar) {
            const calendarApi = selectedItem.view.calendar;
            calendarApi.unselect();
    
            const newEventPrisma = {
                companyId: newEvent.companiesSelected.id,
                title: newEvent.eventName,
                start: new Date(selectedItem.start),
                allDay: false,
                timeFormat: "MILITARY",
            };
    
            axios.post(`/api/company/${newEvent.companiesSelected.id}/event`, newEventPrisma)
                .then(() => {
                    toast({
                        title: "Evento creado",
                    });
                    router.refresh();
                })
                .catch((error) => {
                    toast({
                        title: "Error al crear el evento",
                        variant: "destructive",
                    });
                    console.error(error);
                });
    
            setNewEvent({
                eventName: "",
                companiesSelected: {
                    name: "",
                    id: "",
                },
            });
    
            setOnSaveEvent(false);
        }
    }, [onSaveEvent, selectedItem, events]);
    

    const handleEventClick = async (select : any) => {
        if(window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`/api/event/${select.event._def.publicId}`)
                toast({
                    title : "Evento eliminado",
                })
                router.refresh()
                
            } catch (error) {
                toast({
                    title : "Error al eliminar el evento",
                    variant : "destructive"
                })
            }
        }
    }

    return (
        <div>
            <div className="md:flex gap-x-3 ">
                <div className="w-[200px] relative">
                    <div className="overflow-auto absolute left-0 top-0 w-full h-full">
                        <p className="mb-3 text-xl">Listado de tareas</p>
                        {
                            events.map((event) => (
                                <div key={event.id} className="p-4 rounded-lg shadow-md mb-2 bg-slate-300">
                                    <p className="font-bold">{event.title}</p>
                                    <p>{formatDate(event.start)}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex-1 calendar-container">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonth]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        height="80vh"
                        initialView="dayGridMonth"
                        weekends={false}
                        events={events}
                        eventContent={EventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            <ModalEvent open={open} setOpen={setOpen} setOnSaveEvent={setOnSaveEvent} companies={companies} setNewEvent={setNewEvent}/>
        </div>
    )
}

function EventContent(props : EventContentArg) {
    return (
        <div className="bg-slate-200 dark:bg-background w-full p-1">
            <i>{props.event.title}</i>
        </div>
    )
}