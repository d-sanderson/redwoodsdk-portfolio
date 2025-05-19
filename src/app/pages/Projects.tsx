"use client";
import PrimaryLayout from "../layouts/primary-layout";
import { RequestInfo } from "rwsdk/worker";
import { projectsData } from "@/data/projects";
import { Card } from "./Card";


export const Projects = ({ ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug}>
      <h1 className="text-2xl text-center">Projects</h1>
      {projectsData.map((project) => (
        <Card {...project} key={project.slug} />
      ))}
    </PrimaryLayout>
  );
};
