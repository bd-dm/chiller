import { OverlayWindow } from "./overlay-window";
import { injectApp, injectAssets } from "./utils";

const inject = async () => {
	await injectAssets();
	injectApp(OverlayWindow);
};

inject();
