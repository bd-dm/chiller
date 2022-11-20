/// <reference types="@types/chrome" />

declare module "*.scss";

declare global {
	interface Window {
		injectChillerOverlay: () => void;
	}
}
