"use client"

import Head from "next/head"
import { NextStudio } from "next-sanity/studio"
import { NextStudioHead } from "next-sanity/studio/head"
import sanityConfig from "@/sanity/sanity.config"

export default function StudioPage() {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={sanityConfig} />
    </>
  )
}

export const dynamicParams = true

export async function generateStaticParams() {
  return ["studio"]
}
