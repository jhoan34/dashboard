"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CompanyFormProps, formSchema } from "./companyFomr.type"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import {
    Select,
    SelectContent, 
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@/lib/uploadthing"
import { toast } from "@/hooks/use-toast"
import axios from "axios"


export function CompanyForm (props : CompanyFormProps) {
    const { company } = props
    const router = useRouter()
    const [ photoUploaded, setPhotoUploaded ] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: company.name,
          country: company?.country ?? "",
          website: company?.website ?? "",
          phone: company.phone ?? "",
          cif: company.cif ?? "",
          profileImage: company.profileImage ?? "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/company/${company.id}`, values)
            toast({
                title: "Company updated",
            })
            router.refresh()
        }catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        }
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Company Name" {...field} type="text"/>
                                </FormControl>  
                                <FormMessage />
                            </FormItem> 
                        )}
                    
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="argentina">Argentina</SelectItem>
                                        <SelectItem value="brazil">Brazil</SelectItem>
                                        <SelectItem value="colombia">Colombia</SelectItem>
                                        <SelectItem value="mexico">Mexico</SelectItem>
                                        <SelectItem value="venezuela">Venezuela</SelectItem>
                                    </SelectContent> 
                                </Select>
                                <FormMessage />
                            </FormItem> 
                        )}
                    
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="Website" {...field} type="text"/>
                                </FormControl>
                                <FormMessage />
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
                                    <Input placeholder="+57 123 456 789" {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cif"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CIF / NIF</FormLabel>
                                <FormControl>
                                    <Input placeholder="B-12345678" {...field} type="text"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <div>
                                        {
                                            photoUploaded ? (
                                                <p className="text-sm">Image uploaded</p>
                                            ): (
                                                <UploadButton
                                                    endpoint="profileImage"
                                                    className="bg-slate-600/20 text-slate-800  rounded-lg outline-dotted outline-2"
                                                    {...field}
                                                    onClientUploadComplete={(res) => {
                                                        form.setValue("profileImage", res?.[0].url)
                                                        setPhotoUploaded(true)
                                                    }}
                                                    onUploadError={(error) => { 
                                                        console.log(error)
                                                        toast({
                                                            title: "Something went wrong",
                                                        })
                                                    }}
                                                /> 
                                            )
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Company description" {...field}  value={form.getValues().description ?? ""}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>
                <Button type="submit">Edit Company</Button>
            </form>
        </Form>
    )
}