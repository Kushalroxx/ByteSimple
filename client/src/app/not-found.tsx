'use client';

import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ delay: 0.5 }}
    >
      <Image
        width={500}
        height={500}
        src="/assets/404.webp"
        alt="Lost Astronaut"
        className="mb-6 w-2/3 md:w-1/3 rounded-2xl"
      />
      <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1> 
      <p className="text-muted-foreground mt-2 max-w-md">
        Whoops! The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
      </p>

      <Button variant={"outline"} asChild className="mt-6">
        <Link href="/">Home</Link>
      </Button>
    </motion.div>
  );
}
