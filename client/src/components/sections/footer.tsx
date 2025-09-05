import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'

export default function Footer() {
  return (
   <div className="border-t border-t-foreground/15 px-4 md:px-10 py-8 bg-black text-white">
  <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start flex-wrap">
    <div className="md:w-1/4 min-w-[200px]">
      <img className='w-22 md:w-28' src={"/assets/logo.png"} alt="logo" />
      <p className="text-sm text-foreground/80">Helping you build fast, user-focused digital products.</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 flex-grow">
      <div>
        <h2 className="font-semibold mb-2">Address</h2>
        <ul className="space-y-1 text-sm text-foreground/80">
          <li>Diamond Harbour, WB</li>
          <li> 700001, South 24 pgs</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Contact</h2>
        <ul className="space-y-1 text-sm text-foreground/80">
          <li>Phone: +91 9999999999</li>
          <li>Email: 0ZVcR@example.com</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Social</h2>
        <ul className="space-y-1 text-sm text-foreground/80">
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/#"}>Instagram</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/#"}>Facebook</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/#"}>Twitter</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/#"}>LinkedIn</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/#"}>YouTube</Link></li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Company</h2>
        <ul className="space-y-1 text-sm text-foreground/80">
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/about"}>About</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/blogs"}>Blog</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/contactus"}>Contact Us</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/demos"}>Demos</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/"}>Home</Link></li>
          <li><Link className='hover:underline hover:text-blue-600 active:text-blue-600' href={"/services"}>Services</Link></li>
        </ul>
      </div>
    </div>
  </div>


  <div className="mt-8 border-t border-foreground/10 pt-4 text-center text-xs text-foreground/50">
    © {new Date().getFullYear()} ByteXylon. All rights reserved.
  </div>
</div>

  )
}
