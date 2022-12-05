const isElementInViewport = (element: HTMLElement): boolean => {
	const rect = element.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

const scrollToElementIfNotVisible = (element: HTMLElement): void => {
	if (isElementInViewport(element)) {
		return;
	}

	element.scrollIntoView();
};

export { scrollToElementIfNotVisible };
