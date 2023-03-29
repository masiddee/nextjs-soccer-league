import type { StorybookConfig } from "@storybook/react-webpack5"
import PnpWebpackPlugin from "pnp-webpack-plugin"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // @ts-expect-error
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      plugins: [PnpWebpackPlugin],
    }
    config.resolveLoader = {
      ...config.resolveLoader,
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    }

    if (!config.module?.rules) return

    const imageRule = config.module.rules.find(rule => {
      if (typeof rule !== "string" && rule.test instanceof RegExp) {
        return rule.test.test(".svg")
      }
    })

    if (imageRule && typeof imageRule !== "string") {
      imageRule.exclude = /\.svg$/
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.resolve(__dirname, "../src/components")
    }

    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] })

    // We're going to ratchet @babel/preset-typescript into the babel-loader config to handle modern TS syntax
    // Hopefully babel/next will handle this for us in the future
    const babelLoaderRule = config.module.rules.find(
      rule =>
        // @ts-ignore
        typeof rule !== "string" && /babel-loader/.test(rule.use?.[0]?.loader)
    )

    if (babelLoaderRule && typeof babelLoaderRule !== "string") {
      // @ts-ignore
      babelLoaderRule.use[0].options.presets.push("@babel/preset-typescript")
    }

    return config
  },
}
export default config
