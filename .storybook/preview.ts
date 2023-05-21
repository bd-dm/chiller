import {Preview} from "storybook-solidjs";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
		backgrounds: {
			default: 'dark',
			values: [
				{
					name: 'dark',
					value: '#2a2c2e',
				},
			],
		},
  },
};

export default preview;
