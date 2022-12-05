(async () => {
	const src = chrome.runtime.getURL("entries/content.js");
	await import(src);

	window.injectChillerOverlay();
})();
