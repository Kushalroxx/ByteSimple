"use client";
import { motion } from "framer-motion";
import { Marquee } from '../magicui/marquee'
import { FaNodeJs, FaReact } from 'react-icons/fa'
import { SiNginx, SiTypescript } from 'react-icons/si'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'

const icons = [
 <FaReact />,
 <SiTypescript />,
 <FaNodeJs />,
 <RiTailwindCssFill />,
 <SiNginx />,
 <RiNextjsFill />
];
 
export default function HomeLogo({className}:{className?:string}) {
  return (
   <motion.div className="mt-8 mb:mt-16 flex justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0,}} viewport={{ once: true }} transition={{delay:0.5}}>
          {icons.map((icon, i) => (
            <span key={i} className="inline-block mx-2 text-2xl md:text-3xl">
              {icon}
            </span>
          ))}
        </motion.div>
  );
}
