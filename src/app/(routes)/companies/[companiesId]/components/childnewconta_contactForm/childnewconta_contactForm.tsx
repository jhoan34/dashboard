"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter  } from "next/navigation"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import axios from "axios"
import { ContactFormProps } from "./contactForm.types"


const formSchema = z.object({
    name : z.string().min(2).max(50),
    role : z.string(),
    email : z.string(),
    phone : z.string(),
})

export function Childnewconta_contactForm (props : ContactFormProps) {
    const { setOpen } = props
    const router = useRouter()
    const {companiesId} = useParams()
    console.log(companiesId, "1111111111111")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
        }
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

    
        try {
            await axios.post(`/api/company/${companiesId}/contact`, values);
            toast({
                title: "Contacto creado",
            });
            router.refresh();
            setOpen(false);
        } catch (error) {
            toast({
                title: "Ocurrió un error",
                variant: "destructive",
            });
        }
    };
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 grid grid-cols-1 gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="correo@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+34 123 456 789" type="number" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                
                />
               <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="comercial">Comercial</SelectItem>
                                    <SelectItem value="ventas">Ventas</SelectItem>
                                    <SelectItem value="CEO">CEO</SelectItem>
                                    <SelectItem value="customerService">Customer Service</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Save Contact</Button>
            </form>

        </Form>
    )
}