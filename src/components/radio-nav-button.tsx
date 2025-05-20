"use client";

import { generateSlug } from "@/app/shared/utils";

interface RadioNavButtonProps {
  title: string; // Used for display and to generate the href hash
  isToggle?: boolean; // For non-navigational toggle behavior
  color?: string;
  isActive?: boolean; // Controlled by parent based on current URL hash
}

export default function RadioNavButton({
  title,
  isToggle = false,
  color = "#BB99FF", // Default active color
  isActive = false,
}: RadioNavButtonProps) {
  // Generate a URL-friendly hash from the sectionId or title
  const slug = `/${generateSlug(title === "about" ? "/" : title)}`

  return (
    <a
      href={slug} // Use the slugified title for the href
      // onClick={handleClick}
      title={title} // Tooltip shows the readable title
      className={`flex items-center group cursor-pointer relative my-3 mx-1 sm:m-5 font-bold ${
        !isToggle ? "hue-rotate" : ""
      } ${
        isActive
          ? "text-primary"
          : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
      }`}
      // aria-current is appropriate for the active navigation link
      aria-current={isActive && !isToggle ? "page" : undefined}
      // If it's part of a set that behaves like a radio group, role="radio" and aria-checked could be used.
      // However, for navigation, aria-current is often more semantic.
      // role={!isToggle ? "radio" : undefined}
      // aria-checked={!isToggle ? isActive : undefined}
    >
      <span
        className="design relative w-4 h-4 border border-[#53B3CB] rounded-full mx-5 transition-transform duration-300 hover:scale-110"
        data-title={title}
        style={{
          backgroundColor: isActive ? color : "transparent",
        }}
      >
        {/* Dot inside the circle */}
        <span
          className={`absolute inset-0 m-auto w-2 h-2 rounded-full transform scale-50 transition-all duration-300 ${
            isToggle ? "bg-[#53B3CB]" : isActive ? "bg-white" : `bg-[${color}]`
          }`}
        ></span>
      </span>
    </a>
  );
}
