"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { motion } from "framer-motion"
import InViewAnimation from "./inViewAnimation"

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1,
        },
    },
}
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
}
const models = [
  {
    icon: "🔧",
    title: "Fixed Price Model",
    subtitle: "Best for: Well-defined projects",
    points: [
      "Pre-defined deliverables",
      "Locked timeline & budget",
      "No hidden charges",
      "Ideal for MVPs, landing pages, small apps"
    ]
  },
  {
    icon: "⏱️",
    title: "Time & Material Model",
    subtitle: "Best for: Evolving requirements",
    points: [
      "Pay for actual time spent",
      "Agile & iterative development",
      "Easy scope adjustments",
      "Ideal for SaaS platforms, dashboards"
    ]
  },
  {
    icon: "👥",
    title: "Dedicated Team Model",
    subtitle: "Best for: Ongoing development",
    points: [
      "Full-time developers at your disposal",
      "Transparent communication",
      "Scalable resources on demand",
      "Ideal for scaling startups and enterprises"
    ]
  }
]

export default function EngagementModelsSection() {
    const router = useRouter()
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <InViewAnimation delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-bold mb-2">🚀 Engagement Models</h2>
        </InViewAnimation>
        <InViewAnimation delay={0.2}>
        <p className="text-muted-foreground md:text-lg mb-12">Choose the right fit for your needs</p>
        </InViewAnimation>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((model, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.005 }}>
          <Card key={i} className="rounded-2xl shadow-sm shadow-foreground/20 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                <span className="text-2xl">{model.icon}</span>
                {model.title}
              </CardTitle>
              <p className="md:text-lg text-muted-foreground">{model.subtitle}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {model.points.map((point, idx) => (
                  <li className="" key={idx}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        ))}
      </motion.div>
      <InViewAnimation delay={.5}>

      <div className="mt-8 text-center">
        <Button onClick={() => {router.push("/contactus")}} className="text-base px-6 py-3" size="lg">
          Let’s Chat <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      </InViewAnimation>
    </section>
  )
} 
