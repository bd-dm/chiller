import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/** See https://playwright.dev/docs/test-configuration */

const reporters: PlaywrightTestConfig["reporter"] = [
	["html", { outputFolder: "./playwright-report/tests-report" }],
];

if (process.env.CI) {
	reporters.push(["dot"]);
} else {
	reporters.push(["list"]);
}

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
	reporter: reporters,
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
