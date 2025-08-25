'use client';

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">500 – Something went wrong</h1>
      <p className="text-muted-foreground mt-2">An unexpected error occurred while loading the page.</p>

      <button
        onClick={() => reset()}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}