"use client";
import { motion } from "framer-motion";

export default function HomeLogo({className}:{className?:string}) {
  return (
    <div className={`${className} hidden md:flex w-full h-full`}>
    <div className="relative flex items-center justify-center w-full h-full ">
      <motion.img
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        // onHoverStart={{ rotate: -180 }}
        transition={{ duration: 2, ease: "linear", type:"spring"}}
        src={"/assets/circle.webp"}
        className="absolute "
      />
      <motion.img
      initial={{opacity: 0, x:10}}
      animate={{opacity:1, x:0}}
      transition={{duration:.3}}
        src={"/assets/logo.png"}
        className="absolute md:w-[170px] lg:w-[230px]"
      />
    </div>
    </div>
  );
}
