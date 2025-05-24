"use client";

import type React from "react";
import RetroHitCounter from "react-retro-hit-counter";
import Navigation from "@/components/navigation";

export default function PrimaryLayout({
  slug,
  children,
  includeNavivation = true,
  includeHeader = true,
  hits = 0,
}: Readonly<{
  children: React.ReactNode;
  slug: string | null;
  includeNavivation?: boolean;
  includeHeader?: boolean;
  hits: number
}>) {
  return (
    <div className={`relative font-body`}>
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
      <footer className="w-full text-center py-8 bg-[#e6eef5] dark:bg-gray-900">
        <RetroHitCounter
          hits={hits}
          /* The following are all default values: */
          // withBorder={true}
          // withGlow={true}
          minLength={4}
          size={20}
          padding={4}
          digitSpacing={3}
          segmentThickness={4}
          segmentSpacing={0.5}
          segmentActiveColor="#76FF03"
          segmentInactiveColor="#315324"
          backgroundColor="#222222"
          borderThickness={7}
          glowStrength={0.5}
        />
      </footer>
    </div>
  );
}
