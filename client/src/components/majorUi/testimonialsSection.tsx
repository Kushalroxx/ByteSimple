import React from "react";
import Slider from "react-slick";
import { motion, Variants } from "framer-motion";
import { Card, CardHeader } from "../ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InViewAnimation from "./inViewAnimation";

const fadeInUp:Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay:.4,type:"spring" } },
};

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonials = [
  {
    name: "Rohit Verma",
    title: "Co-founder at DevMatrix",
    text: "We approached their team for a complete revamp of our SaaS dashboard. They understood our vision perfectly and delivered a fast, scalable, and elegant solution. Totally dependable!",
    image: "https://i.pravatar.cc/100?img=33",
  },
  {
    name: "Abhishek Kumar",
    title: "Co-founder at Zero2One",
    text: "Their UI/UX sense is top-notch. They delivered our company portfolio site in record time with excellent performance. Highly recommended for any serious web project.",
    image: "https://i.pravatar.cc/100?img=45",
  },
];


  return (
    <section className="py-20 bg-black">
      <InViewAnimation delay={0.25}>
      <h2
        className="text-4xl md:text-5xl text-center font-bold mb-8"
      >
        What Our Clients Says
      </h2>
      </InViewAnimation>
      <div className="max-w-3xl mx-auto px-4 ">
        <Slider className="slick-dots-visible overflow-visible" {...settings}>
          {testimonials.map((t, id) => (
            <motion.div
              whileHover={{ scale: 1.005 }}
              key={id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-4"
            >
              <Card className="shadow-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-300 ">
              <CardHeader>
                <p className="text-lg italic text-foreground mb-6 text-center">“{t.text}”</p>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">- {t.name}</p>
                  <p className="text-sm text-foreground/80">{t.title}</p>
                </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
