import React, { FunctionComponent } from 'react';
import { generateSlug } from '../shared/utils';

interface Props {
  title: string;
  description?: string;
  tags?: string[];
  repo?: string;
  url?: string;
}

export const Card: FunctionComponent<Props> = ({
  title,
  tags,
  description,
  repo,
  url,
}: Props) => {
  // Helper function to construct anchor/button styles
  // Tailwind doesn't have a direct way to apply styles to prose links globally from a parent
  // like Theme UI's sx prop. For dangerouslySetInnerHTML, you might need to pre-process
  // the HTML or use a Tailwind typography plugin if you need deep styling of the HTML.
  // For simplicity here, link styling within description is not deeply addressed beyond a parent class.
  // The buttons will have their own explicit styling.

  // Base styles for links and buttons, mimicking the original gradient underline effect
  const commonLinkStyles =
    'text-white dark:text-black no-underline bg-gradient-to-r from-pink-500 to-pink-500 dark:from-pink-500 dark:to-pink-500';
  const commonLinkBackgroundStyles =
    'bg-no-repeat transition-all duration-200 ease-linear hover:bg-[length:100%_100%] bg-[position:0_100%]';

  const liveButtonGradient = 'bg-gradient-to-r from-cyan-400 to-cyan-400 dark:from-cyan-400 dark:to-cyan-400'; // #43f4ff
  const sourceButtonGradient = 'bg-gradient-to-r from-pink-500 to-pink-500 dark:from-pink-500 dark:to-pink-500'; // #f36aff

  return (
    <div className="border-2 border-pink-500 dark:border-pink-400 p-2.5 w-full my-9"> {/* Replaced accent with pink-500, adjust as needed */}
      {tags && tags.length > 0 && (
        <div className="mt-2 flex justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-pink-500 dark:border-pink-400 text-pink-500 dark:text-pink-400 px-2 py-1 mx-2 text-xs rounded" // Mimicking outline badge
            >
              {tag.toLowerCase()}
            </span>
          ))}
        </div>
      )}
      <a href={`/projects/${generateSlug(title)}`} className="block">
      <h3 className="text-2xl font-bold text-center my-4 text-gray-900 dark:text-gray-100">{title.toLowerCase()}</h3>
      </a>
      {description && (
        <div
          className="my-2 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-a:text-pink-600 hover:prose-a:text-pink-700 dark:prose-a:text-pink-400 dark:hover:prose-a:text-pink-300" // Using Tailwind Typography for prose styling
          // For custom link styling inside dangerouslySetInnerHTML, Tailwind Typography is a good solution.
          // If not using Typography, you'd need to parse the HTML or scope CSS.
          // The 'prose-a:...' classes are examples if you use @tailwindcss/typography.
          // If you need the exact gradient underline on these links, it's more complex with dangerouslySetInnerHTML.
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <div className="flex justify-end my-3">
        {url && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            className={`px-3 py-1 my-2 mx-1 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${commonLinkStyles} ${liveButtonGradient} ${commonLinkBackgroundStyles}
                        text-white dark:text-black`} // Ensure text color contrasts with button bg
          >
            See Live
          </a>
        )}
        {repo && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={repo}
            className={`px-3 py-1 my-2 mx-1 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${commonLinkStyles} ${sourceButtonGradient} ${commonLinkBackgroundStyles}
                        text-white dark:text-black`} // Ensure text color contrasts with button bg
          >
            View Source
          </a>
        )}
      </div>
    </div>
  );
};
