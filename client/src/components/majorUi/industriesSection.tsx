"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import {
  FaShoppingCart,
  FaHeartbeat,
  FaServer,
  FaSchool,
  FaBuilding,
  FaUsers,
  FaCreditCard,
  FaTruck,
  FaChartLine,
  FaPaintBrush
} from "react-icons/fa"
import {motion} from "framer-motion"
import InViewAnimation from "./inViewAnimation"

const industries = [
  { name: "E-Commerce", icon: <FaShoppingCart size={36} className="text-indigo-600" /> },
  { name: "Healthcare", icon: <FaHeartbeat size={36} className="text-red-600" /> },
  { name: "SaaS", icon: <FaServer size={36} className="text-green-600" /> },
  { name: "EdTech", icon: <FaSchool size={36} className="text-yellow-600" /> },
  { name: "Real Estate", icon: <FaBuilding size={36} className="text-purple-600" /> },
  { name: "Social Media", icon: <FaUsers size={36} className="text-pink-600" /> },
  { name: "FinTech", icon: <FaCreditCard size={36} className="text-teal-600" /> },
  { name: "Logistics", icon: <FaTruck size={36} className="text-orange-600" /> },
  { name: "Enterprise Software", icon: <FaChartLine size={36} className="text-sky-600" /> },
  { name: "Portfolios & Creatives", icon: <FaPaintBrush size={36} className="text-fuchsia-600" /> },
]
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
export default function IndustriesSection() {
  return (
    <section className="pt-26 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <InViewAnimation delay={0.25}>
        <h2 className="text-4xl font-bold">🌍 Industries We Build For</h2>
        </InViewAnimation>
        <InViewAnimation delay={.3}>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          From startups to enterprises, we craft tailored solutions across diverse sectors.
        </p>
        </InViewAnimation>
      </div>
      <motion.div initial={"hidden"} whileInView={"visible"} viewport={{once:true}} variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {industries.map(({ name, icon }) => (
          <motion.div variants={itemVariants} key={name} whileHover={{scale:1.005}} className="">
          <Card
            key={name}
            className="flex flex-col shadow-sm shadow-foreground/20 hover:shadow-md transition-shadow delay-300 items-center justify-center p-6 cursor-pointer rounded-xl"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-center">{name}</h3>
          </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
