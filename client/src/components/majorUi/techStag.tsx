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

const techIcons = [
  { name: "HTML5", icon: <SiHtml5 size={40} /> },
  { name: "CSS3", icon: <SiCss3 size={40} /> },
  { name: "JavaScript", icon: <SiJavascript size={40} /> },
  { name: "TypeScript", icon: <SiTypescript size={40} /> },
  { name: "React", icon: <SiReact size={40} /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },
  { name: "Redux", icon: <SiRedux size={40} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={40} /> },
  { name: "Vite", icon: <SiVite size={40} /> },
  { name: "Webpack", icon: <SiWebpack size={40} /> },

  { name: "Node.js", icon: <SiNodedotjs size={40} /> },
  { name: "Express", icon: <SiExpress size={40} /> },
  { name: "NestJS", icon: <SiNestjs size={40} /> },

  { name: "MongoDB", icon: <SiMongodb size={40} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={40} /> },
  { name: "MySQL", icon: <SiMysql size={40} /> },
  { name: "Firebase", icon: <SiFirebase size={40} /> },
  { name: "Prisma", icon: <SiPrisma size={40} /> },

  { name: "GraphQL", icon: <SiGraphql size={40} /> },
  { name: "Apollo", icon: <SiApollographql size={40} /> },

  { name: "Docker", icon: <SiDocker size={40} /> },
  { name: "Kubernetes", icon: <SiKubernetes size={40} /> },

  { name: "Git", icon: <SiGit size={40} /> },
  { name: "GitHub", icon: <SiGithub size={40} /> },
  { name: "GitLab", icon: <SiGitlab size={40} /> },

  { name: "Vercel", icon: <SiVercel size={40} /> },
  { name: "Netlify", icon: <SiNetlify size={40} /> },
  { name: "AWS Amplify", icon: <SiAwsamplify size={40} /> },
  { name: "Amazon Web Services", icon: <FaAws size={40} /> },

  { name: "Sanity", icon: <SiSanity size={40} /> },
  { name: "Strapi", icon: <SiStrapi size={40} /> },
  { name: "Contentful", icon: <SiContentful size={40} /> },

  { name: "Stripe", icon: <SiStripe size={40} /> },
  { name: "Twilio", icon: <SiTwilio size={40} /> },

  { name: "Jest", icon: <SiJest size={40} /> },
  { name: "Cypress", icon: <SiCypress size={40} /> },
  { name: "Testing Library", icon: <SiTestinglibrary size={40} /> }
]

export default function TechStack() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <InViewAnimation delay={.2}>
        <h2 className="text-4xl md:text-5xl font-bold mb-2">🛠️ Technologies We Use</h2>
        </InViewAnimation>
        <InViewAnimation delay={.3}>
        <p className="text-muted-foreground md:text-lg">Modern, scalable, and trusted tools</p>
        </InViewAnimation>
      </div>
      <InViewAnimation delay={.35}>

      <div className="relative mt-12 w-full overflow-hidden">
        <div className="w-full whitespace-nowrap">
          <motion.div
            className="flex gap-3 md:gap-9"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              duration: 19
            }}
            >
            {techIcons.map((tech, i) => (
              <Card
              key={i}
              className="w-40 h-28 flex flex-col items-center justify-center shadow-md rounded-2xl shrink-0"
              >
                <div className="">{tech.icon}</div>
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
            </InViewAnimation>
    </section>
  )
}
