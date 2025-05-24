"use server";

import { env } from "cloudflare:workers";

export async function sendMessage(prompt: string) {
  console.log("Running AI with Prompt:", prompt);
  // @ts-ignore: Model is not yet typed.
  
  const messages = [
    { role: "system", content: `You specialize in knowledge about David Sandersons resume. Only answer questions related to the following content: 
      Skills
Programming Languages
JavaScript (ES6), Typescript, Python, C#,
HTML, CSS
Libraries and Frameworks
React, Next, Node.js, .NET, Cypress,
Playwright, Jest
Tools and Platforms
Git, Docker, Segment, GraphQL, Vercel,
Hasura, Directus
Design
Figma, Responsive Design, Rive
Education
CNM Ingenuity
2018 // Albuquerque, NM
CNM Ingenuity Cert. of Completion - Fullstack
Bootcamp
University of New Mexico
2008 - 2013 // Albuquerque, NM
Bachelors of Science - Evolutionary
Anthropology
Amy Biehl High School
2004 - 2008 // Albuquerque, NM
High School Diploma

Past Projects
See davidsanderon.dev/#projects
David Sanderson
Software Engineer
davidsanderson.dev
github.com/d-sanderson
sanderdj90@gmail.com
505-604-5355
linkedin.com/in/d-sanderson
Experience
Professional Summary
Results-driven Software Engineer with 7 years of experience architecting and
deploying high-performance software applications. Expert in JavaScript
ecosystem, and modern web technologies, consistently delivering scalable and
efficient solutions that drive business growth. Known for combining technical
excellence with strong collaboration skills to transform complex requirements
into elegant software solutions.
Resident Web Developer @ Activate New Mexico
October 2019 - February 2020 // Albuquerque, NM
Provided technical support and consultation to early-stage startups.
Created 3 websites for participating startups.
Conducted database design for a health-care startup.
Draft and execute project charters.
Technologies used: React, Gatsby, GQL, WordPress, MySQL, MySQL Workbench
Jr. Software Engineer @ iTeam Consulting
February 2020 - April 2021 // Albuquerque, NM
Technologies used: Gatsby, Git, React, C#, SharePoint, Jest, Tailwind, Hasura, Netlify, Active
Directory, Exchange, O365, Azure, various ORMs
 Migrate multiple legacy websites to the JAM stack using GatsbyJS.
 Maintain and regularly update legacy ASP.NET Web applications (MVC 5.0 and Razor Pages).
Implement designs I create or am provided in Figma.
 Created a Gatsby application that sources data from Sharepoint Lists to programmatically create web
pages.
Maintain and develop new features for our credits and ticketing e-commerce site, supporting over
$100M in annual sales.
Leverage front-end technologies to develop whimsical and imaginative web experiences.
Collaborate with various stakeholders (Designers, Product Management, QA, Data Engineering) to
plan and create web applications that are functional, performant, and joyful.
Software Engineer, Product & Engineering @ Meow Wolf
April 2021 - present // Albuquerque, NM
Technologies used: NextJS, Typescript, Jest, Playwright, GQL, Figma, Cloudflare, Ticketure` },
    {
      role: "user",
      content: prompt,
    },
  ];
  const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    messages,
    stream: true,
    max_tokens: 256,
  });
  console.log("AI Response:", response);
  return response as unknown as ReadableStream;
}