"use client";
import PrimaryLayout from '../layouts/primary-layout'
import { RequestInfo } from "rwsdk/worker";

export const Resume = ( { ctx }: RequestInfo) => {
  return (
    <PrimaryLayout slug={ctx.slug}>
    <div>Resume</div>
    </PrimaryLayout>
  )
}
