import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/** See https://playwright.dev/docs/test-configuration */

const config: PlaywrightTestConfig = {
	testDir: "tests",
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: undefined,
	reporter: [process.env.CI ? ["dot"] : ["list"], ["html"]],
	use: {
		actionTimeout: 3 * 1000,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
};

export default config;
