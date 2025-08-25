"use client"
import {
  Card, CardContent, CardHeader, CardTitle, Input, Label, Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, Button,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui'
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'
import { toast } from 'sonner'

export default function page() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [type, setType] = React.useState("user")
  const router = useRouter()
  const handleCreate = async () => {
    try {
      if (!email || !password || !type) {
        toast("Please fill all the fields")
        return
      }
      if (password.length < 8) {
        toast("password must be at least 8 characters")
        return
      }
      await axios.post(`${serverUrl}/super-admin/create-user`, {
          email,
          password,
          type
      },{withCredentials:true});
      toast("User created successfully")
      setEmail("")
      setPassword("")
      setType("")
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast("User already exists")
        }
        if (error.response?.status === 401) {
          router.push("/")
        }
      }
    }
  }
  return (
    <div>
      <Card className='max-w-lg mx-auto mt-20'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Create User</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 flex flex-col'>
          <div className='space-y-1'>
            <Label className='text-base md:text-lg font-semibold'>
              Email
            </Label>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter email' />
          </div>
          <div className='space-y-1'>
            <Label className='text-base md:text-lg font-semibold'>
              Password
            </Label>
            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter password' />
          </div>
          <div className='flex gap-2 items-center'>
            <Label className='text-base font-semibold'>Type:</Label>
            <Select onValueChange={(e) => setType(e)} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="subadmin">Sub Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='font-semibold'>Create User</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to create this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to create a new user with the following details:
                  <br />
                  <br/>
                  <strong>Email:</strong> {email} <br />
                  <strong>Password:</strong> {password} <br />
                  <strong>User Type:</strong> {type} <br /><br />
                  Please double-check the information before proceeding. Once created, the user will be able to access the platform based on their assigned role.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCreate}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
