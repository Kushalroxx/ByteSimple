"use client"
import Auth from '@/components/sections/auth'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { navOpenAtom, userAtom } from '@/lib/atoms'
import { serverUrl } from '@/lib/exportEnv'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'nextjs-toploader/app'
import React, { useState } from 'react'
import { FaUser, FaUserCircle } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import { IoIosLogOut } from 'react-icons/io'

export default function page() {
    const [user, setUser] = useAtom(userAtom)
    const [isOpen, setIsOpen] = useAtom(navOpenAtom);
      const [signInOpen, setSignInOpen] = useState(false);
      const [refresh, setRefresh] = useState(false);
      const router = useRouter();
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/auth/signout`, { withCredentials: true });
      setRefresh((prev) => !prev);
      router.push("/");
    } catch {}
  };
    return (
    <div className='h-screen flex justify-center items-center'>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <FaUser className="text-xl" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col">
            <div className="flex items-center gap-3 py-2 px-2 hover:bg-zinc-800 rounded">
              <FaUserCircle />
              <p>{user.email}</p>
            </div>
            <div onClick={handleLogOut} className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer rounded">
              <IoIosLogOut />
              <p>Log out</p>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Auth open={signInOpen} setOpen={setSignInOpen}>
          <Button variant="default" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold">
            <FiLogIn className="text-lg" />
            Login
          </Button>
        </Auth>
      )}
    </div>
  )
}
