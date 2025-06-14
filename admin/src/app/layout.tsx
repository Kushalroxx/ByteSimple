import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ZERO2ONE Enterprise ",
  description: "ZERO2ONE Enterprise provides top-tier services in app development specifically for web development with unmatched commitment and expertise. Explore our demos, services, blogs, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${roboto.className}  antialiased`}
      >
        <NextTopLoader showSpinner={false}/>
        {children}
      </body>
    </html>
  );
}
