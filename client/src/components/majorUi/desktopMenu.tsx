import Link from "next/link";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@/components/ui";
import Auth from "../sections/auth";

export default function DesktopMenu({ navItems, pathname, user, signInOpen, setSignInOpen, onLogout }:{
    navItems: { href: string; label: string }[];
    pathname: string;
    user: any;
    signInOpen: boolean;
    setSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => void;
}) {
  return (
    <div className="flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`hover:text-cyan-600 transition font-medium ${pathname.startsWith(item.href) ? "text-cyan-500 underline underline-offset-4" : "text-zinc-200"}`}
        >
          {item.label}
        </Link>
      ))}
      {/* {user ? (
        <Popover>
          <PopoverTrigger>
            <FaUser className="text-xl" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col">
            <div className="flex items-center gap-3 py-2 px-2 hover:bg-zinc-800 rounded">
              <FaUserCircle />
              <p>{user.email}</p>
            </div>
            <div onClick={onLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer rounded">
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
      )} */}
    </div>
  );
}
