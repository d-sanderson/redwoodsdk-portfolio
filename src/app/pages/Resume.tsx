"use client";
import PrimaryLayout from "../layouts/primary-layout";
import { RequestInfo } from "rwsdk/worker";

export const Resume = ({ ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug} hits={ctx.hits}>
      <h1 className="text-2xl text-center">Resume</h1>
    </PrimaryLayout>
  );
};
