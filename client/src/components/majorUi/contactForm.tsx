"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardHeader } from "../ui"
import axios from "axios"
import { serverUrl } from "@/lib/exportEnv"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({message: "Please enter a valid email."}),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number."
  }),
  description: z.string().min(10, {
    message: "Please enter a valid Description."
  }),
})

export function ContactForm() {
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
            const res = await axios.post(`${serverUrl}/contacts`,data)
            router.push("/success")
        }catch(error){
            console.log(error);
        }
      }
  return (
    <Card className="w-[92%]  md:w-[37%] h">
        <CardHeader className="space-y-5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-shadow">Contact Us</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Enter your Email" {...field} />
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
              <FormLabel>phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Phone No" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-base font-bold" type="submit">Connect</Button>
      </form>
    </Form>
    </CardHeader>
    </Card>
  )
}
