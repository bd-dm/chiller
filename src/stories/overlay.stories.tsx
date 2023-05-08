import { Meta, StoryObj } from "storybook-solidjs";

import { MessageType } from "../common/message-carrier";
import { App } from "../content/App";

// @ts-ignore mocks
chrome.runtime = {};
// @ts-ignore mocks
chrome.runtime.sendMessage = async ({ type }) => {
	switch (type) {
		case MessageType.GetCurrentTab: {
			return {
				// @ts-ignore mock
				id: 1,
				url: "https://example.com",
				title: "Test page",
			};
		}
	}
};

const meta: Meta<typeof App> = {
	title: "Overlay",
	component: App,
};

type Story = StoryObj<typeof App>;

export const Overlay: Story = {
	render: () => (
		<div
			style={{
				background: "white",
				height: "100vh",
				width: "100%",
			}}
		>
			<App />
		</div>
	),
};

export default meta;
