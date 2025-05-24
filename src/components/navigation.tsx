"use client";

import RadioNavButton from "./radio-nav-button";

interface NavigationProps {
  className?: string;
  slug: string | null
}

export default function Navigation({ className, slug }: NavigationProps) {
  return (
    <nav className={`flex flex-wrap justify-center ${className}`}>
      <RadioNavButton
        title="about"
        color="#FF5A5A" // Red
        isActive={slug === "/"}
      />
      <RadioNavButton
        title="projects"
        color="#F49FBC" // Pink
        isActive={slug === "projects"}
      />
      <RadioNavButton
        title="games"
        color="#7ED957" // Green
        isActive={slug === "games"}
      />
      <RadioNavButton
        title="resume"
        color="#FF9F45" // Orange
        isActive={slug === "resume"}
      />
    </nav>
  );
}
