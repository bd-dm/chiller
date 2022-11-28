import { test } from "../test-utils/fixtures";

test.describe("Mechanics/AddScript", () => {
	test('Opens add script page on click "Add script"', async ({
		page,
		extension,
		ui,
	}) => {
		await extension.goToPopup();
		await ui.getButton("Add script").click();
		page.getByTitle("Add script");
	});

	test("Adds script - happy path", async ({ page, extension, ui }) => {
		await extension.goToPopup();
		const button = ui.getButton("Add script");
		await button.click();
		page.getByTitle("Add script");

		await ui.getInput("Name").fill("Test name");

		await ui.within(
			ui.getFieldSet("Variables").getFieldSetRow("Variable 1"),
			async (ui) => {
				await ui.getInput("Variable name").fill("testVariableName");
				await ui.getInput("Value").fill("test value");
			}
		);

		await ui.within(
			ui.getFieldSet("Steps").getFieldSetRow("Step 1"),
			async (ui) => {
				await ui.getSelect("Select action...").type("test");
			}
		);
	});
});
