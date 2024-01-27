import { ControlPanel, ControlPanelType } from "common/control-panel";
import { createAppInElement } from "common/utils";

createAppInElement(
	() => <ControlPanel type={ControlPanelType.Popup} />,
	"root",
);
