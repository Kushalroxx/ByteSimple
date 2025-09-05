"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useAtom } from "jotai";
import axios from "axios";

import { navOpenAtom, userAtom } from "@/lib/atoms";
import { serverUrl } from "@/lib/exportEnv";
import DesktopMenu from "./desktopMenu";
import MobileMenu from "./mobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useAtom(navOpenAtom);
  const [user, setUser] = useAtom(userAtom);
  const pathname = usePathname();
  const [signInOpen, setSignInOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/#services", label: "SERVICES" },
    { href: "/#caseStudies", label: "CASE STUDIES" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contactus", label: "CONTACTS" },
  ];

  if (user?.type === "user") {
    navItems.push(
      { href: "/dashboard", label: "DASHBOARD" },
      { href: "/projects", label: "PROJECTS" },
      { href: "/invoices", label: "INVOICES" }
    );
  }

  if (user?.type === "subAdmin" || user?.type === "admin") {
    navItems.push({ href: "/admin/dashboard", label: "DASHBOARD" });
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/check`, { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    checkUser();
  }, [refresh]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/auth/signout`, { withCredentials: true });
      setRefresh((prev) => !prev);
      router.push("/");
    } catch {}
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
   <motion.nav
  initial={{ opacity: 0, y: -5 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, type: "keyframes" }}
  className={`fixed left-1/2 -translate-x-1/2 z-50 font-archivo text-[#b5b4b2] transition-all duration-300
    ${scrolled
      ? "top-4 w-[90%] rounded-full bg-background backdrop-blur border border-zinc-900"
      : "top-0 w-full rounded-none bg-background border-b border-zinc-900"
    }`}
>
  <div className="flex justify-between items-center px-8 py-2">
    <Link href="/" className="text-3xl">
      <img src="/assets/logo.png" alt="Logo" className="w-16 md:w-26" />
    </Link>

    {/* Desktop Menu */}
    <div className="hidden lg:flex px-10">
      <DesktopMenu
        navItems={navItems}
        pathname={pathname}
        user={user}
        onLogout={handleLogOut}
        signInOpen={signInOpen}
        setSignInOpen={setSignInOpen}
        />
    </div>
    {/* Hamburger */}
    <div className="lg:hidden text-3xl">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdClose /> : <TiThMenu />}
      </button>
    </div>
  </div>
</motion.nav>
<div className="w-full relative overflow-hidden">
        <MobileMenu
          isOpen={isOpen}
          navItems={navItems}
          pathname={pathname}
          user={user}
          onLogout={handleLogOut}
          signInOpen={signInOpen}
          setSignInOpen={setSignInOpen}
          closeMenu={() => setIsOpen(false)}
          />
      </div>
          </>
  );
}
