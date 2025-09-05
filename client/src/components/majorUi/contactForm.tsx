"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Card, CardHeader, Loader } from "@/components/ui"
import axios from "axios"
import { serverUrl } from "@/lib/exportEnv"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({message: "Please enter a valid email."}),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
  }),
})
const fields = [
    { name: "name", label: "Name", placeholder: "Enter your name", component: Input },
    { name: "email", label: "Email", placeholder: "Enter your email", component: Input },
    { name: "phone", label: "Phone Number", placeholder: "Enter your phone number", component: Input },
    { name: "description", label: "Description", placeholder: "Enter your description", component: Textarea },
  ] as const 
export function ContactForm({loading,setLoading}:{
  loading:boolean,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}) {
  
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          description: "",
        },
      })
      const onSubmit= async(data: z.infer<typeof formSchema>)=> {
        try{
          setLoading(true)
            const res = await axios.post(`${serverUrl}/contacts`,data)
            router.push("/success")
        }catch(error){
            console.log(error);
        }finally{
          setLoading(false)
        }
      }
      
  return (
    <Card className="w-xl bg-transparent border-none">
        <CardHeader className="space-y-5">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
        {
          fields.map(({name,component:Component,label,placeholder}) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base ml-1 font-semi-bold">{label}</FormLabel>
                  <FormControl>
                    <Component className={`focus:!ring-0 shadow-white/10 text-base rounded-xl ${Component === Textarea ? "h-28" : "h-10"} shadow-md`} placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))
        }
        <Button className="text-base mt-4 rounded-full font-medium" type="submit">Send Message</Button>
      </form>
    </Form>
    </CardHeader>
    </Card>
  )
}
