"use client"
import { serverUrl } from '@/lib/exportEnv'
import { contactInterface } from '@/lib/interfaces'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import React, { use, useEffect } from 'react'
import { Loader } from '../ui'
import ContactTable from '../majorUi/contactTable'

export default function Contacts() {
    const [contacts, setContacts] = React.useState<contactInterface[]|null|"">(null) 
    const router = useRouter()
    useEffect(() => {
        
        const getContacts = async () => {
            try {
            const res = await axios.get(`${serverUrl}/admin/contacts`,{
                withCredentials:true
            })
            
            setContacts(res.data.contacts)
        } catch (error) {
         if (error instanceof AxiosError) {
            if(error.status === 404){
                setContacts("")
            }
          if(error.status === 401){
            router.push("/signin")
          }
         }}}
         getContacts()
},[])
    if (contacts === null) {
        return (
            <Loader/>
        )
    }
  return (
    <div className='flex h-screen justify-center items-center'>
      {
        contacts === "" ? 
        <h1 className='text-foreground text-3xl font-bold'>Your Contacts will be shown here</h1>
        :
        <div className='md:w-2/3'>
        <ContactTable contacts={contacts}/>
        </div>
      }
    </div>
  )
}
