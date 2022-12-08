import fs from "node:fs";

import { type BrowserContext, chromium, test as base } from "@playwright/test";
import { exec } from "child_process";
import { createCoverageMap } from "istanbul-lib-coverage";
import path from "path";
import v8ToIstanbul from "v8-to-istanbul";

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

test.beforeAll(async ({ page }) => {
	await page.coverage.startJSCoverage();
});

test.afterAll(async ({ page }) => {
	const coverage = await page.coverage.stopJSCoverage();
	const coverageFilePath = path.resolve(
		__dirname,
		"../../.nyc_output/out.json"
	);
	const coverageFileDir = path.dirname(coverageFilePath);
	const finalCoverage = createCoverageMap();

	for (const entry of coverage) {
		const { source, functions, url } = entry;
		const scriptPath = path.resolve(
			__dirname,
			"../../dist/" + url.split("/").slice(3).join("/")
		);

		if (!source) {
			continue;
		}

		const converter = v8ToIstanbul(scriptPath);
		await converter.load();
		converter.applyCoverage(functions);
		const coverage = converter.toIstanbul();

		finalCoverage.merge(coverage);
	}

	if (!fs.existsSync(coverageFileDir)) {
		await fs.promises.mkdir(coverageFileDir);
	}

	await fs.writeFile(
		coverageFilePath,
		JSON.stringify(finalCoverage.toJSON()),
		{ flag: "w" },
		() => {}
	);

	return new Promise<void>((resolve) => {
		exec(
			"nyc report --reporter=html --report-dir=./playwright-report/coverage",
			() => {
				resolve();
			}
		);
	});
});

const expect = test.expect;

export { expect, test };
