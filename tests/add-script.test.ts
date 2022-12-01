import { Page } from "../src/popup/home/enums";
import { test } from "../test-utils";

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

	test("Adds script - happy path", async ({ extension, ui }) => {
		await extension.goToPopup();
		const button = ui.getButton("Add script");
		await button.click();

		await ui.getInput("Name").fill("Test name");

		await ui.within(
			ui.getFieldSet("Variables").getRow("Variable 1"),
			async (ui) => {
				await ui.getInput("Variable name").fill("testSelector");
				await ui.getInput("Value").fill("[data-chiller]");
			}
		);

		await ui.within(ui.getFieldSet("Steps"), async (ui) => {
			await ui.within(ui.getRow("Step 1"), async (ui) => {
				await ui.getSelect("Select action...").click();
				await ui.type("cl");
				await ui.getButton("Click").click();

				await ui.getSelect("Select input type...").click();
				await ui.type("wit");
				await ui.getButton("With variable").click();

				await ui.getSelect("Select variable...").click();
				await ui.type("tes");
				await ui.getButton("testSelector").click();
			});

			await ui.within(ui.getRow("Step 2"), async (ui) => {
				await ui.getSelect("Select action...").click();
				await ui.getButton("Type string").click();

				await ui.getSelect("Select input type...").click();
				await ui.getButton("Text").click();

				await ui.getInput("Text").type("Test text");
			});
		});

		await ui.getRow("Step 3");

		await ui.getButton("Save").click();
		await ui.getPage(Page.ScriptList).isVisible();
		await ui.getRow("Test name").isVisible();
	});
});
