"use client";
import PrimaryLayout from "../layouts/primary-layout";
import { RequestInfo } from "rwsdk/worker";
import { gamesData } from "@/data/games";

export const Games = ({ ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug}>
      <div>Games</div>
      <pre>{JSON.stringify(gamesData, null, 2)}</pre>
    </PrimaryLayout>
  );
};
