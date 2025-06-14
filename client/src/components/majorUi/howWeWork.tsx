"use client";
import { ChevronRight } from "lucide-react"; // or use any arrow icon from lucide/react or heroicons
import { Card, CardHeader } from "../ui";
import { motion, Variants } from "framer-motion"; 
import InViewAnimation from "./inViewAnimation";

const containerVariants:Variants = {
  hidden:{
    opacity:0
  },
  visible:{
    opacity:1,
    transition:{
      delayChildren:0.3,
      staggerChildren:0.1,
  }
}
}
const itemVariants:Variants = {
  hidden:{opacity:0, y:20},
  visible:{opacity:1,y:0}
}
export default function HowWeWork() {
  const steps = [{
    step: "Step 1",
    title: "Discovery Call",
    description:"We start with a conversation to understand your goals, vision, and needs."
  },
  {
    step: "Step 2",
    title: "Proposal & Quote",
    description:"You’ll get a clear project scope, timeline, and pricing — no surprises."
  },
  {
    step: "Step 3",
    title: "Design & Development",
    description:"We bring your idea to life using the best tools and tech stacks."
  },
  {
    step: "Step 4",
    title: "Feedback & Iteration",
    description:"You review, we revise — until everything feels just right."
  },
  {
    step: "Step 5",
    title: "Launch & Support",
    description:"We go live and offer ongoing support or scale-up services as needed."
  }
  ];

  return (
    <>
    <InViewAnimation delay={0.1}>
    <h1 className="text-4xl md:text-5xl text-center font-extrabold mb-12 mt-20">How We Work !!</h1>
    </InViewAnimation>
    <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="flex flex-wrap gap-y-3 items-center justify-center w-full">
      {steps.map((step, i) => (
        <motion.div whileHover={{scale:1.005}} variants={itemVariants} className="w-3/4 md:w-[30%] flex items-center gap-2" key={i}>
          <Card className="w-[90%] shadow-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-300" >
            <CardHeader>
            {/* <h1 className="text-foreground text-xl mb-3 md:text-2xl font-bold">{step.step}</h1> */}
            <div className="ml-4 space-y-2">
              <h2 className="text-xl md:text-2xl text-foreground font-semibold">{step.title}</h2>
              <p className="md:text-lg text-foreground/80">{step.description}</p>
            </div>
            </CardHeader>
          </Card>
          {i !== steps.length - 1 && (
            <ChevronRight className="w-6 h-6 text-foreground font-extrabold" />
          )}
        </motion.div>
      ))}
    </motion.div></>
  );
}

