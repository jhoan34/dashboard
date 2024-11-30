"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreateCustomerProps } from "./FormCreate.types";
import { useState } from "react";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios"
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IsKnown } from "@tanstack/react-table";


const formSchema = z.object({
  name: z.string(),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string(),
});

export function FormCreateCustomer(props: FormCreateCustomerProps) {
  const { setOpenModalCreate } = props;
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      cif: "",
      profileImage: "",
    },
  });

  const { isValid } = form.formState;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.profileImage) {
      toast({
        title: "Please upload a profile image",
        variant: "destructive",
      });
      return;
    }
  
    try {
      await axios.post("/api/company", values);
      toast({
        title: "Company created",
      });
      router.refresh();
      setOpenModalCreate(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong" ,
        variant: "destructive",
      });
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>
                    Please enter your full name.
                </FormDescription>
                <FormMessage className="text-red-500" />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                    onValueChange={(value) => field.onChange(value)} // Aquí actualizas el valor correctamente
                    defaultValue={field.value}
                >
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select the country" />
                    </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="colombia">Colombia</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
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
                        <Input placeholder="Enter your website URL" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
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
                        <Input placeholder="Enter your phone number" type="number" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="cif"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>CIF</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your CIF" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                            {
                                photoUploaded ? (
                                    <p className="text-sm">Image Uploaded</p>
                                ): (
                                    <UploadButton
                                        className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                        {...field}
                                        endpoint="profileImage"
                                        onClientUploadComplete={(res) => {
                                            form.setValue("profileImage", res?.[0].url)
                                            setPhotoUploaded(true);
                                        }}
                                        onUploadError={(error : Error ) => {
                                          toast({
                                            title: "Error uploading"
                                          })
                                        }}
                                    />
                                )
                            }

                        </FormControl>
                        <FormMessage className="text-red-500"/>
                    </FormItem>
                )}
            />

            <Button 
                disabled={!isValid} type="submit" >
                Submit
            </Button>
        </div>
      </form>
    </Form>
  );
}
