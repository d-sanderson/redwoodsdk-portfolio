import { projectsData } from "@/data/projects";
import { RequestInfo } from "rwsdk/worker";
import PrimaryLayout from "../layouts/primary-layout";

export const Details = async ({ params }: RequestInfo) => {
  const slug = params.slug;
  const project = projectsData.find((project) => project.slug === slug);
  return (
    <PrimaryLayout slug={null} includeNavivation={false} includeHeader={false}>
      <h1>{params.slug}</h1>
      {JSON.stringify(project)}
    </PrimaryLayout>
  );
};
