import type { Meta, StoryObj } from "@storybook/react"
import { TextComponent } from "./text"

const meta: Meta<typeof TextComponent> = {
  title: "components/TextComponent",
  component: props => <TextComponent />,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TextComponent>

export const Default: Story = {
  args: {},
}
