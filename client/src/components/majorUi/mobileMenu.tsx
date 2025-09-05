import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@/components/ui";
import Auth from "../sections/auth";
import { MdClose } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

export default function MobileMenu({
  isOpen,
  navItems,
  pathname,
  user,
  signInOpen,
  setSignInOpen,
  onLogout,
  closeMenu,
}: {
  isOpen: boolean;
  navItems: { href: string; label: string }[];
  pathname: string;
  user: any;
  signInOpen: boolean;
  setSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  closeMenu: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-screen w-3/4  bg-black shadow-lg z-50 flex flex-col px-6 pt-3 gap-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            >
            <div className="flex justify-between items-start">
            <ul className="flex flex-col gap-6 mt-16">
              {navItems.map((item) => (
                <li key={item.href} onClick={closeMenu}>
                  <Link
                    href={item.href}
                    className={`text-lg ${
                      pathname.startsWith(item.href)
                        ? "text-cyan-500 font-bold"
                        : "hover:text-cyan-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              
            </ul>
             <button className="text-3xl cursor-pointer " onClick={() => closeMenu()}>
                        {isOpen ? <MdClose /> : <TiThMenu />}
                      </button>

                      </div>
            {/* {user ? (
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2 text-lg">
                    <FaUser />
                    User
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col mt-2">
                    <div className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-800 rounded">
                      <FaUserCircle />
                      <p>{user.email}</p>
                    </div>
                    <div
                      onClick={onLogout}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                      <IoIosLogOut />
                      <p>Log out</p>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Auth open={signInOpen} setOpen={setSignInOpen}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <FiLogIn className="text-lg" />
                    Login
                  </Button>
                </Auth>
              )} */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
