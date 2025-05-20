import { projectsData } from "@/data/projects";
import { RequestInfo } from "rwsdk/worker";
import PrimaryLayout from "../layouts/primary-layout";
import { Card } from "./Card";
import { gamesData } from "@/data/games";

export const Details = async ({ params }: RequestInfo) => {
  const slug = params.slug;
  const project = [...projectsData, ...gamesData].find((project) => project.slug === slug);
  const type = project?.type;
  return (
    <PrimaryLayout slug={null} includeNavivation={false} includeHeader={false}>
      <a href={`/${type}s`}>back to {type}s</a>
      <Card {...project} title={params.slug} />
    </PrimaryLayout>
  );
};
