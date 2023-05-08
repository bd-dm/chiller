import { Meta, StoryObj } from "storybook-solidjs";

import { ControlPanel, ControlPanelType } from "../common/control-panel";

const meta: Meta<typeof ControlPanel> = {
	title: "ControlPanel",
	component: ControlPanel,
};

type Story = StoryObj<typeof ControlPanel>;

export const DevTools: Story = {
	render: () => <ControlPanel type={ControlPanelType.DevTools} />,
};

export const Popup: Story = {
	render: () => <ControlPanel type={ControlPanelType.Popup} />,
};

export default meta;
