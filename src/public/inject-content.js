(async () => {
	const src = chrome.runtime.getURL("content/index.js");
	await import(src);

	window.injectChillerOverlay();
})();
