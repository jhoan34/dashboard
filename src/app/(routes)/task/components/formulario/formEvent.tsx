"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormEventProps } from "./formEvent.types";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Esquema Zod para validación
const formSchema = z.object({
    eventName: z.string().min(2).max(50),
    companiesSelected: z.object({
        name: z.string().min(2),
        id: z.string().min(2)
    })
});

export function FormEvent(props: FormEventProps) {
    const { setNewEvent, setOpen, companies, setOnSaveEvent } = props;

    // Estado para manejar la compañía seleccionada
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        id: ""
    });
    console.log(selectedCompany);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            companiesSelected: {
                name: "",
                id: ""
            }
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setNewEvent(values);
        setOpen(false);
        setOnSaveEvent(true);
    };

    const handleCompanyChange = (value: string) => {
        // Busca la compañía seleccionada por ID
        const company = companies.find((company) => company.id === value);

        if (company) {
            // Actualiza el estado y los valores del formulario
            setSelectedCompany({
                name: company.name,
                id: company.id
            });

            form.setValue("companiesSelected", {
                name: company.name,
                id: company.id
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Campo para el nombre del evento */}
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Event Name" {...field} />
                            </FormControl>
                            <FormDescription>this is the event name</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo para seleccionar una compañía */}
                <FormField
                    control={form.control}
                    name="companiesSelected"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <Select
                                onValueChange={(newValue) => {
                                    handleCompanyChange(newValue); // Cambiar compañía seleccionada
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue {...field} placeholder="Select a company" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {companies.map((company) => (
                                        <SelectItem key={company.id} value={company.id}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Create Event</Button>
            </form>
        </Form>
    );
}
