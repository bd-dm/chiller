import { Locator, Page, TestFixture } from "@playwright/test";

interface UILocatorBase {
	getButton: (name: string) => UILocator;
	getPage: (name: string) => UILocator;
	getInput: (name: string) => UILocator;
	getSelect: (name: string) => UILocator;
	getFieldSet: (name: string) => UILocator;
	getRow: (name: string) => UILocator;
	within: (
		locator: UILocatorLike,
		withinFn: (ui: UILocator) => void,
	) => Promise<void>;
}

type UILocator = Locator & UILocatorBase;

type UILocatorLike = UILocator | Locator | Page;

type UIFixtureGetter = (context: UILocatorLike) => UILocator;
type UIFixture = UILocator;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uiFixture: TestFixture<UIFixture, any> = async ({ page }, use) => {
	const getBaseLocator = (context: UILocatorLike): UILocatorBase => ({
		getButton: (name) =>
			getUIFixture(context.getByRole("button", { name, exact: true })),
		getPage: (name) =>
			getUIFixture(context.getByRole("main", { name, exact: true })),
		getInput: (name) =>
			getUIFixture(context.getByRole("textbox", { name, exact: true })),
		getSelect: (name) =>
			getUIFixture(context.getByRole("listbox", { name, exact: true })),
		getFieldSet: (name) =>
			getUIFixture(context.getByRole("group", { name, exact: true })),
		getRow: (name) =>
			getUIFixture(context.getByRole("row", { name, exact: true })),
		within: async (locator, withinFn) => {
			await withinFn(getUIFixture(locator));
		},
	});

	const getUIFixture: UIFixtureGetter = (context) =>
		Object.assign(context as UILocator, getBaseLocator(context));

	await use(getUIFixture(page));
};

export { uiFixture };
export type { UIFixture };
