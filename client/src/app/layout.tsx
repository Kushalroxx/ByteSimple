import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Navbar from "@/components/majorUi/navbar";
import { Toaster } from "@/components/ui";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  display: 'swap',
  variable: '--font-poppins',  
});
export const metadata: Metadata = {
  title: "ByteXylon",
  description: "ByteXylon provides top-tier services in app development specifically for web development with unmatched commitment and expertise. Explore our demos, services, blogs, and more.",
  keywords: [
    "ByteXylon",
  "web development agency",
  "Software development",
  "Enterprise software",
  "Web development",
  "App development",
  "Tech company",
  "Custom software solutions",
  "MVPs",
  "eCommerce",
  "Mobile apps",
  "Web apps",
  "Product design",
  "UI/UX design",
  "Software for startups",
  "Agile development",
  "Full-stack development",
  "Cloud application development",
  "SaaS development",
  "Digital product agency",
  "Tech partner for startups",
  "Software engineering services",
  "Cross-platform app development",
  "Next.js development",
  "React Native development",
  "API integrations",
  "Scalable software architecture",
  "B2B software solutions",
  "User-centered design",
  "Startup software agency",
  "Mobile-first design",
  "Digital transformation services"
]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html className="dark" lang="en">
      <body
        className={`m-0 p-0 ${poppins.className} antialiased`}
      >
         <NextTopLoader showSpinner={false} />
         <Navbar/>
        {children}
         <Toaster position="top-center" />
      </body>
    </html>
  );
}
