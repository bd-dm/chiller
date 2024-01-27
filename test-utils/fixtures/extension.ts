import { TestFixture } from "@playwright/test";

interface ExtensionFixture {
	id: string;
	goToPopup: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extensionFixture: TestFixture<ExtensionFixture, any> = async (
	{ context, page },
	use,
) => {
	let [worker] = context.serviceWorkers();
	if (!worker) {
		worker = await context.waitForEvent("serviceworker");
	}

	const id = worker.url().split("/")[2];

	const goToPopup = async () => {
		await page.goto(`chrome-extension://${id}/src/popup/popup.html`);
	};

	await use({ id, goToPopup });
};

export { extensionFixture };
export type { ExtensionFixture };
