(async () => {
	const elements = document.querySelectorAll("[data-chiller-overlay=true]");
	if (elements && elements.length) {
		elements.forEach((element) => element.remove());
	}
})();
