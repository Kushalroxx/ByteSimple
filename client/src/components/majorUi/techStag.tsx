"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiJavascript,
  SiHtml5, SiCss3, SiRedux, SiVite, SiWebpack,
  SiNodedotjs, SiExpress, SiNestjs,
  SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiPrisma,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGitlab,
  SiVercel, SiNetlify, SiAwsamplify,
  SiSanity, SiStrapi, SiContentful,
  SiStripe, SiTwilio, SiGraphql, SiApollographql,
  SiJest, SiCypress, SiTestinglibrary
} from "react-icons/si"
import { FaAws } from "react-icons/fa";
import InViewAnimation from "./inViewAnimation"
import { Marquee } from "../magicui/marquee"

const techIcons = [
  { name: "HTML5", icon: <SiHtml5   /> },
  { name: "CSS3", icon: <SiCss3   /> },
  { name: "JavaScript", icon: <SiJavascript   /> },
  { name: "TypeScript", icon: <SiTypescript   /> },
  { name: "React", icon: <SiReact   /> },
  { name: "Next.js", icon: <SiNextdotjs   /> },
  { name: "Redux", icon: <SiRedux   /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss   /> },
  { name: "Vite", icon: <SiVite   /> },
  { name: "Webpack", icon: <SiWebpack   /> },

  { name: "Node.js", icon: <SiNodedotjs   /> },
  { name: "Express", icon: <SiExpress   /> },
  { name: "NestJS", icon: <SiNestjs   /> },

  { name: "MongoDB", icon: <SiMongodb   /> },
  { name: "PostgreSQL", icon: <SiPostgresql   /> },
  { name: "MySQL", icon: <SiMysql   /> },
  { name: "Firebase", icon: <SiFirebase  /> },
  { name: "Prisma", icon: <SiPrisma /> },

  { name: "GraphQL", icon: <SiGraphql  /> },
  { name: "Apollo", icon: <SiApollographql /> },

  { name: "Docker", icon: <SiDocker  /> },
  { name: "Kubernetes", icon: <SiKubernetes  /> },

  { name: "Git", icon: <SiGit  /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "GitLab", icon: <SiGitlab /> },

  { name: "Vercel", icon: <SiVercel  /> },
  { name: "Netlify", icon: <SiNetlify  /> },
  { name: "AWS Amplify", icon: <SiAwsamplify  /> },
  { name: "Amazon Web Services", icon: <FaAws  /> },

  { name: "Sanity", icon: <SiSanity  /> },
  { name: "Strapi", icon: <SiStrapi  /> },
  { name: "Contentful", icon: <SiContentful  /> },

  { name: "Stripe", icon: <SiStripe /> },
  { name: "Twilio", icon: <SiTwilio  /> },

  { name: "Jest", icon: <SiJest  /> },
  { name: "Cypress", icon: <SiCypress  /> },
  { name: "Testing Library", icon: <SiTestinglibrary  /> }
];

export default function TechStack() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <InViewAnimation >
        <h2 className="text-4xl md:text-5xl font-bold pb-10"> Technologies We Use</h2>
        </InViewAnimation>
      </div>
      <InViewAnimation >

      <div className="relative w-full overflow-hidden">
        <div className="relative w-full overflow-hidden py-4">
      <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-zinc-950/30 to-transparent" />

      <Marquee className="">
        {[...techIcons, ...techIcons].map((tech, i) => (
          <div
          key={i}
          className="flex items-center justify-center text-4xl"
          >
            {tech.icon}
          </div>
        ))}
        </Marquee>
      

      <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-zinc-950/30 to-transparent" />
    </div>
      </div>
            </InViewAnimation>
    </section>
  )
}
