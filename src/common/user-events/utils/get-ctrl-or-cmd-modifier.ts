import { PressKeyModifier } from "../events";

const getCtrlOrCmdModifier = (): PressKeyModifier => {
	if (window.navigator.platform === "Win32") {
		return PressKeyModifier.Ctrl;
	} else {
		return PressKeyModifier.Command;
	}
};

export { getCtrlOrCmdModifier };
