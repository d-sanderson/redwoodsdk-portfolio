"use client";
import PrimaryLayout from "../layouts/primary-layout";
import { RequestInfo } from "rwsdk/worker";
import { gamesData } from "@/data/games";
import { Card } from "./Card";

export const Games = ({ ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug} hits={ctx.hits}>
      <h1 className="text-2xl text-center">Games</h1>
      {gamesData.map((game) => (
        <Card {...game} key={game.slug} />
      ))}
    </PrimaryLayout>
  );
};
