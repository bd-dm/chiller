import { IconName, Row } from "common/components";
import { Component } from "solid-js";

import { MenuButton } from "../../../components/menu-button";
import { useControlPanelContext } from "../../context";
import { Page } from "../../enums";

const ButtonsRow: Component = () => {
	const { page, setPage } = useControlPanelContext();

	return (
		<Row
			horizontalAlignment={Row.Alignment.Horizontal.Center}
			verticalAlignment={Row.Alignment.Vertical.Center}
		>
			<MenuButton
				icon={IconName.List}
				active={page() === Page.ScriptList}
				onClick={() => setPage(Page.ScriptList)}
			>
				Scripts
			</MenuButton>
			<MenuButton
				icon={IconName.Add}
				active={page() === Page.AddScript}
				onClick={() => setPage(Page.AddScript)}
			>
				Add
			</MenuButton>
			<MenuButton
				icon={IconName.Upload}
				active={page() === Page.ImportScript}
				onClick={() => setPage(Page.ImportScript)}
			>
				Import
			</MenuButton>
		</Row>
	);
};

export { ButtonsRow };
