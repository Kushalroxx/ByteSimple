import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui"
import SignIn from './SignIn'
import SignUp from '../majorUi/signUp'
export default function Auth({children, open, setOpen}:{children:React.ReactElement|string,
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [isSignIn, setIsSignIn] = useState(true)
  return (
   <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    {children}
  </AlertDialogTrigger>
  <AlertDialogContent className=" rounded-xl px-1 shadow-xl bg-background border border-border">
        {
        isSignIn ?
        <SignIn setIsSignIn={setIsSignIn} setOpen={setOpen} />
        :
        <SignUp setIsSignIn={setIsSignIn} setOpen={setOpen} />
        }
   <AlertDialogFooter>
    <AlertDialogCancel className="absolute top-4 right-4 text-2xl px-2 hover:bg-muted rounded-md border-none bg-background">
      ×
    </AlertDialogCancel>
  </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
