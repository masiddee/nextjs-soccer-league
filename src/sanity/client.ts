import { makeSafeQueryRunner } from "groqd"

/**
 * Instead of using @sanity/client, we'll just create a simple fetch wrapper
 *  to use the HTTP API directly for better Next.js cache integration.
 */
const sanityFetch = async (
  query: string,
  params: Record<string, number | string> = {},
  useCDN = false
) => {
  const url = new URL(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.${
      useCDN ? "apicdn" : "api"
    }.sanity.io/v2021-10-21/data/query/${
      process.env.SANITY_DATASET || "production"
    }`
  )

  url.searchParams.append("query", query)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(`$${key}`, JSON.stringify(value))
  })

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
    },
    next: {
      revalidate: false,
    },
  })
  const data = await res.json()
  return data?.result
}

export const runQuery = makeSafeQueryRunner(
  (
    query,
    params: Record<string, any> = {},
    { useCDN = true }: { useCDN?: boolean } = {}
  ) => {
    return sanityFetch(query, params, useCDN)
  }
)
