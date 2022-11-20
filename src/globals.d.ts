/// <reference types="@types/chrome" />

declare global {
	interface Window {
		injectChillerOverlay: () => void;
	}
}
