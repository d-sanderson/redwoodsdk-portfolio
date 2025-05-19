"use client";
import type React from "react";
import "./primary-layout";
import Navigation from "@/components/navigation";

export default function PrimaryLayout({
  slug,
  children,
  includeNavivation = true,
  includeHeader = true,
}: Readonly<{
  children: React.ReactNode;
  slug: string | null;
  includeNavivation?: boolean;
  includeHeader?: boolean;
}>) {
  return (
    <body className={`relative font-body`}>
      <main className="min-h-screen bg-[#e6eef5] dark:bg-gray-900 flex flex-col items-center pt-16 px-4 transition-colors duration-200 dark:text-gray-100">
        {includeHeader && (
          <>
            <h1 className="text-xl font-normal">David Sanderson</h1>
            <div className="w-64 h-px bg-gray-400 dark:bg-gray-600 my-2"></div>
            <h2 className="dark:text-gray-300 font-normal mb-12">
              Software Engineer
            </h2>
          </>
        )}
        {includeNavivation && <Navigation slug={slug} />}
        <div className="max-w-md">{children}</div>
      </main>
    </body>
  );
}
