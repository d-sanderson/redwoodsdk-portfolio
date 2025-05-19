"use client";
import { RequestInfo } from "rwsdk/worker";
import PrimaryLayout from "../layouts/primary-layout";

export function Home({ ctx }: RequestInfo) {
  const slug = ctx?.slug
  return (
    <PrimaryLayout slug={slug}>
      {/* Content */}
      {/* <div className="max-w-md"> */}
        <h3 className="text-2xl font-mono my-4 text-gray-800 dark:text-gray-100">
          Hi I am David Sanderson!
        </h3>
        <p className="font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a Software Engineer from Albuquerque, New Mexico. I enjoy playing
          piano, learning new languages, and leveraging code to (creatively)
          solve problems.
        </p>
      {/* </div> */}
    </PrimaryLayout>
  );
}
