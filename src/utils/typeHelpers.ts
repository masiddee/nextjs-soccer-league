import type { GetStaticProps } from "next"

export type PropsFromStaticProps<T> = T extends GetStaticProps<infer P>
  ? P
  : never
