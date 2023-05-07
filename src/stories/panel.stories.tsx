import { Meta, StoryObj } from "storybook-solidjs";

import { ControlPanel, ControlPanelType } from "../common/control-panel";

const meta: Meta<typeof ControlPanel> = {
	title: "ControlPanel",
	component: ControlPanel,
};

type Story = StoryObj<typeof ControlPanel>;

export const Primary: Story = {
	render: () => <ControlPanel type={ControlPanelType.DevTools} />,
};

export default meta;
