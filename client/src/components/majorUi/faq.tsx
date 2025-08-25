import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui"
import InViewAnimation from './inViewAnimation'
const faqData = [
  // {
  //   question: "What kind of projects do you take on?",
  //   answer:
  //     "We specialize in full-stack web development — from landing pages and SaaS platforms to custom dashboards and e-commerce applications."
  // },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope. Simple websites take 1–2 weeks, while larger platforms may take 3–6 weeks with active collaboration."
  },
  // {
  //   question: "Do you offer fixed pricing or hourly billing?",
  //   answer:
  //     "We usually work on fixed-price contracts for clarity, but we also offer hourly or retainer-based billing for long-term collaborations."
  // },
  {
    question: "Will you handle hosting, domain, and deployment?",
    answer:
      "Yes! We handle everything end-to-end — including domain setup, server configuration, CI/CD pipelines, and deployment (e.g., Vercel, Netlify, or your choice)."
  },
  // {
  //   question: "Will I be able to update the site myself later?",
  //   answer:
  //     "Absolutely. We build with scalability in mind. You’ll get a clean admin panel (if needed) or editable CMS integration (like Sanity or Strapi)."
  // },
  {
    question: "What if I need support after launch?",
    answer:
      "We provide post-launch support packages as well as on-demand help. You’ll never be left hanging — we’re always just a message away."
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we work with clients from all over the world and adjust communication to your preferred timezone and language."
  },
  {
    question: "Do you offer competitive pricing for startups?",
    answer:
      "Yes, we understand budget constraints. We offer special pricing for early-stage startups and solo founders without compromising on quality. Projects can start as low as ₹15,000."
  },
  // {
  //   question: "What technologies do you use most often?",
  //   answer:
  //     "We use modern, scalable stacks like React, Next.js, Node.js, TypeScript, Tailwind CSS, PostgreSQL, MongoDB, Firebase, and deploy on platforms like Vercel or Netlify."
  // },
  {
    question: "How many design or feature revisions are included?",
    answer:
      "We include 2–3 rounds of revisions by default. We aim to get things right from the start, but you're free to request more with add-on support."
  },
  {
    question: "Who owns the code after delivery?",
    answer:
      "You do. Once the project is complete and paid for, full rights and access to the codebase, designs, and assets are handed over to you."
  },
  {
    question: "How do you communicate during a project?",
    answer:
      "We typically use WhatsApp, Email, or Slack for async updates, and Google Meet or Zoom for calls. Daily or weekly updates — whichever you prefer."
  },
  {
    question: "Can you give examples of project types and their pricing?",
    ishtml:true,
    answer: `<div>
      <ul class="list-disc pl-4 space-y-1">
        <li><strong>💼 Landing Page</strong> – ₹15K to ₹25K (1–5 sections, fast delivery)</li>
        <li><strong>🛒 E-commerce Store</strong> – ₹35K to ₹60K (with admin & payment gateway)</li>
        <li><strong>📊 Admin Dashboard</strong> – ₹40K to ₹70K (role-based, analytics, etc.)</li>
        <li><strong>🚀 SaaS MVP</strong> – ₹60K+ (custom features, authentication, APIs)</li>
      </ul>
      <p class="mt-2">Prices vary based on complexity and timeline — we’ll offer a custom quote after a quick chat.</p>
    </div>
    `
  }
]

export default function Faq() {
  return (
    <>
     <div className="text-center mt-20 mb-16">
      <InViewAnimation >
        <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
        </InViewAnimation>
      </div>
      <InViewAnimation>
    <Accordion className='max-w-4xl mx-auto px-2' type="multiple" defaultValue={["item-1"]}>
       {
           faqData.map((item, index) => (
               <AccordionItem key={index} value={`item-${index + 1}`}>
      <AccordionTrigger style={{textDecoration:"none"}} className='text-foreground text-lg font-bold hover:bg-muted/40 px-4'>
        {item.question}
      </AccordionTrigger>

      {item.ishtml ? (
          <AccordionContent>
        <div
          className='px-4'
          dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </AccordionContent>
      ) : (
          <AccordionContent className='px-4 text-base'>
          {item.answer}
        </AccordionContent>
      )}
    </AccordionItem>
  ))
}
</Accordion>
</InViewAnimation>
  </>
  )
}
