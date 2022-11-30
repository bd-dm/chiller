import {
	type BrowserContext,
	chromium,
	Locator,
	Page,
	test as base,
} from "@playwright/test";
import path from "path";

interface ExtensionFixture {
	id: string;
	goToPopup: () => Promise<void>;
}

interface UILocatorBase {
	getButton: (name: string) => UILocator;
	getInput: (name: string) => UILocator;
	getSelect: (name: string) => UILocator;
	getFieldSet: (name: string) => UILocator;
	getFieldSetRow: (name: string) => UILocator;
	within: (
		locator: UILocatorLike,
		withinFn: (ui: UILocator) => void
	) => Promise<void>;
}

type UILocator = Locator & UILocatorBase;

type UILocatorLike = UILocator | Locator | Page;

type UIFixtureGetter = (context: UILocatorLike) => UILocator;
type UIFixture = UILocator;

const test = base.extend<{
	context: BrowserContext;
	extension: ExtensionFixture;
	ui: UIFixture;
}>({
	// eslint-disable-next-line no-empty-pattern
	context: async ({ browserName }, use) => {
		const browserTypes: { chromium: typeof chromium } = { chromium };

		const pathToExtension = path.join(__dirname, "../dist");

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
	extension: async ({ context, page }, use) => {
		let [worker] = context.serviceWorkers();
		if (!worker) {
			worker = await context.waitForEvent("serviceworker");
		}

		const id = worker.url().split("/")[2];

		const goToPopup = async () => {
			await page.goto(`chrome-extension://${id}/src/popup/popup.html`);
		};

		await use({ id, goToPopup });
	},
	ui: async ({ page }, use) => {
		const getBaseLocator = (context: UILocatorLike): UILocatorBase => ({
			getButton: (name) =>
				getUIFixture(context.getByRole("button", { name, exact: true })),
			getInput: (name) =>
				getUIFixture(context.getByRole("textbox", { name, exact: true })),
			getSelect: (name) =>
				getUIFixture(context.getByRole("listbox", { name, exact: true })),
			getFieldSet: (name) =>
				getUIFixture(context.getByRole("group", { name, exact: true })),
			getFieldSetRow: (name) =>
				getUIFixture(context.getByRole("row", { name, exact: true })),
			within: async (locator, withinFn) => {
				await withinFn(getUIFixture(locator));
			},
		});

		const getUIFixture: UIFixtureGetter = (context) =>
			Object.assign(context as UILocator, getBaseLocator(context));

		await use(getUIFixture(page));
	},
});
const expect = test.expect;

export { expect, test };
