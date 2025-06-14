"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import SignIn from "../sections/SignIn";
import axios from "axios";
import { serverUrl } from "@/lib/exportEnv";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom)
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await axios.get(`${serverUrl}/check`, { withCredentials: true })
        setUser(res.data.user)
      } catch (error) {
      }
    }
    checkUserStatus()

  }, [])

  const navItems = [
    { href: "/services", label: "SERVICES" },
    { href: "/demos", label: "DEMOS" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contactus", label: "CONTACTS" },
  ];
  const adminNavItems = [
    { href: "/admin", label: "ADMIN" },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="flex flex-col fixed font-archivo text-[#b5b4b2] z-50 w-full border-b border-zinc-700">
      <div className="w-full flex justify-between items-center backdrop-blur backdrop-opacity-90 md:py-4 px-[3%] border-b border-zinc-900">
        {/* LOGO */}
        <div className="flex text-3xl items-center">
          <Link href="/">
            <img src={"/assets/logo.png"} alt="Logo" className="w-20 md:w-[105px]" />
          </Link>
        </div>

        {/* Desktop NAV */}
        <div className="hidden lg:flex gap-8 justify-center items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-cyan-600 transition duration-300 ${pathname.startsWith(item.href)
                  ? "text-cyan-500 underline underline-offset-4"
                  : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-8">
            {user === null ?
              <SignIn>
                <img src={"/assets/user.svg"} alt="" width={25} />
              </SignIn> :
              <Popover>
                <PopoverTrigger><img src={"/assets/user.svg"} alt="" width={25} /></PopoverTrigger>
                <PopoverContent className="flex flex-col justify-between items-center p-0">
                  <div className="flex justyfy-center items-center gap-3 px-4 py-2 hover:bg-zinc-800">
                  <FaUserCircle />
                  <p>{user.email}</p>
                  </div>
                </PopoverContent>
              </Popover>
            }

            {/*}  <Link href="#">
              <img src={"/assets/envelope.svg"} alt="" width={25} />
            </Link>
            */}
          </div>
        </div>

        {/* Hamburger button */}
        <div className="flex lg:hidden text-4xl">
          <button
            className="flex h-12 w-12 rounded justify-center items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose /> : <TiThMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden absolute right-0 top-12 w-full font-archivo backdrop-blur-md"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ul className="flex flex-col justify-center items-center gap-8 py-4">
          {navItems.map((item) => (
            <Link onClick={() => setIsOpen(false)} key={item.href} href={item.href}>
              <li
                className={`hover:text-cyan-600 transition duration-300 ${pathname.startsWith(item.href) ? "text-cyan-500 font-bold" : ""
                  }`}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
}
