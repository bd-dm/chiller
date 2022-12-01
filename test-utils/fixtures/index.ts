import { type BrowserContext, chromium, test as base } from "@playwright/test";
import path from "path";

import { ExtensionFixture, extensionFixture } from "./extension";
import { UIFixture, uiFixture } from "./ui";

const test = base.extend<{
	context: BrowserContext;
	extension: ExtensionFixture;
	ui: UIFixture;
}>({
	context: async ({ browserName }, use) => {
		const browserTypes: { chromium: typeof chromium } = { chromium };

		const pathToExtension = path.join(__dirname, "../../dist");

		const context = await browserTypes[
			browserName as keyof typeof browserTypes
		].launchPersistentContext("", {
			headless: false,
			ignoreDefaultArgs: ["--disable-extensions"],
			args: [`--load-extension=${pathToExtension}`],
		});
		await use(context);
		await context.close();
	},
	extension: extensionFixture,
	ui: uiFixture,
});
const expect = test.expect;

export { expect, test };
