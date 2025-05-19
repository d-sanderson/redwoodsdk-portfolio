import { projectsData } from "@/data/projects";
import { RequestInfo } from "rwsdk/worker";
import PrimaryLayout from "../layouts/primary-layout";
import { Card }from "./Card";

export const Details = async ({ params }: RequestInfo) => {
  const slug = params.slug;
  const project = projectsData.find((project) => project.slug === slug);
  return (
    <PrimaryLayout slug={null} includeNavivation={false} includeHeader={false}>
      <Card {...project} title={params.slug} key={project?.slug} />
    </PrimaryLayout>
  );
};
