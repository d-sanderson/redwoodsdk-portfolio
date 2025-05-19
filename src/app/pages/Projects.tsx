"use client";
import PrimaryLayout from "../layouts/primary-layout";
import { RequestInfo } from "rwsdk/worker";
import { projectsData } from "@/data/projects";
export const Projects = ({ ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug}>
      <div>Projects</div>
      <pre>{JSON.stringify(projectsData, null, 2)}</pre>
    </PrimaryLayout>
  );
};
