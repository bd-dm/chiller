import { Page } from "../src/common/control-panel/enums";
import { test } from "../test-utils";

test.describe("Mechanics/CreateNewScript", () => {
	test('Opens Add Script page on click "Add"', async ({
		page,
		extension,
		ui,
	}) => {
		await extension.goToPopup();
		await ui.getButton("Add").click();
		await page.getByLabel("AddScript").isVisible();
	});

	test("Creates script - happy path", async ({ extension, page, ui }) => {
		await extension.goToPopup();
		const button = ui.getButton("Add");
		await button.click();

		await ui.getInput("Name").fill("Test name");
		await ui.getButton("Create variable").click();
		await ui.within(
			ui.getFieldSet("Variables").getRow("Variable 1"),
			async (ui) => {
				await ui.getInput("Variable name").fill("testSelector");
				await ui.getInput("Value").fill("[data-chiller]");
			}
		);

		await ui.getButton("Create step").click();
		await ui.within(ui.getFieldSet("Steps"), async (ui) => {
			await ui.within(ui.getRow("1"), async (ui) => {
				await ui.getSelect("Action").click();
				await ui.type("cl");
				await ui.getButton("Click").click();

				await ui.getSelect("Selector type").click();
				await page.keyboard.press("Backspace");
				await page.keyboard.press("Backspace");
				await page.keyboard.press("Backspace");
				await page.keyboard.press("Backspace");
				await ui.type("var");
				await ui.getButton("Variable").click();

				await ui.getSelect("Variable").click();
				await ui.type("tes");
				await ui.getButton("testSelector").click();
			});

			await ui.within(ui.getRow("2"), async (ui) => {
				await ui.getSelect("Action").click();
				await ui.getButton("Enter text").click();

				await ui.getInput("Text").type("Test text");
			});
		});

		await ui.getRow("3");

		await ui.getButton("Save").click();
		await ui.getPage(Page.ScriptList).isVisible();
		await ui.getRow("Test name").isVisible();
	});
});
