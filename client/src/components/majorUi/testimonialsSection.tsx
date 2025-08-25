import React from "react";
import Slider from "react-slick";
import { motion, Variants } from "framer-motion";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InViewAnimation from "./inViewAnimation";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rohit Verma",
      title: "SaaS Revamp Delivered Beyond Expectations",
      text: "We approached their team for a complete revamp of our SaaS dashboard. They understood our vision perfectly and delivered a fast, scalable, and elegant solution. Totally dependable!",
      image: "https://i.pravatar.cc/100?img=33",
    },
    {
      name: "Sneha Kapoor",
      title: "Game-Changing Website for Our Marketing Launch",
      text: "Their attention to branding and detail helped us create a site that made our product launch 10x more impactful. They didn’t just deliver a site, they delivered conversions.",
      image: "https://i.pravatar.cc/100?img=52",
    },
    {
      name: "Nikhil Sharma",
      title: "Reliable Partner for Scalable Web Solutions",
      text: "What stood out was their ability to take ownership. From day one, it felt like they were part of our internal team. Fast, professional, and technically sound.",
      image: "https://i.pravatar.cc/100?img=12",
    },
  ];
  const fadeInUp: Variants = {
    hidden: { opacity: 0},
    visible: { opacity:1,
      transition:{
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20},
    visible: { opacity:1, y: 0},
  }


  return (
    <section className="pt-36">
      <InViewAnimation >
        <h2
          className="text-4xl md:text-5xl text-center font-bold mb-16"
        >
          What Our Clients Says
        </h2>
      </InViewAnimation>
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeInUp} className="justify-center mx-auto px-4 flex flex-wrap gap-8">
  {testimonials.map((testimonial, index) => (
    <motion.div
      key={index}
      variants={child}
      whileHover={{ scale: 1.005, y: -2 }}
      transition={{ duration: 0.1, type: "spring", stiffness: 100, damping: 15 }}
      className="w-full md:w-xs"
    >
      <Card className="border-none rounded-2xl bg-black/50 backdrop-blur backdrop-opacity-10 shadow-xl shadow-zinc-900/50 hover:shadow-lg transition-shadow md:min-h-[490px] flex flex-col justify-between p-5 pt-8">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg md:text-xl font-semibold text-shadow">
                {testimonial.title}
              </CardTitle>
            </div>
          </div>
          <p className="text-foreground/55 text-sm md:text-lg break-words whitespace-normal">
            {testimonial.text}
          </p>
        </CardHeader>
        <CardFooter className="border-t border-border pt-2">
          <p className="text-foreground/55 text-sm break-words whitespace-normal">
            {testimonial.name}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  ))}
</motion.div>

    </section>
  );
};

export default TestimonialsSection;
