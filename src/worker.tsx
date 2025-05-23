import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { db, setupDb } from "./db";
import type { User } from "@prisma/client";
import { env } from "cloudflare:workers";
import { Projects } from "@/app/pages/Projects";
import { Games } from "@/app/pages/Games";
import { Resume } from "@/app/pages/Resume";
import { Details } from "./app/pages/Details";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
  slug: string | null;
  hits: number;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);
    const slug = request?.url.split("/").pop() || "/";
    // Set up the context
    ctx.hits = 0;
    console.log("slug", slug);
    if (slug) {
      ctx.slug  = slug;
      // Increment the count field by 1
      const { count } = await db.pageHit.upsert({
        where: { slug: ctx.slug },
        create: {
          slug: ctx.slug,
          count: 1
        },
        update: {
          count: {
            increment: 1
          }
        }
      })

      ctx.hits = count;
    }
    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  render(Document, [
    route("/", Home),
    route("/projects", Projects),
    route("/games", Games),
    route("/games/:slug", Details),
    route("/resume", Resume),
    route("/projects/:slug", Details),
    // route("/protected", [
    //   ({ ctx }) => {
    //     if (!ctx.user) {
    //       return new Response(null, {
    //         status: 302,
    //         headers: { Location: "/user/login" },
    //       });
    //     }
    //   },
    //   Home,
    // ]),
    // prefix("/user", userRoutes),
  ]),
]);
