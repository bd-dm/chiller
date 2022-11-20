const injectAssets = (assetPaths: string[]): void => {
	assetPaths.forEach((assetPath) => {
		const extension = assetPath.split(".").pop();
		const assetUrl = chrome.runtime.getURL(assetPath);

		switch (extension) {
			case "css": {
				const element = document.createElement("link");
				element.href = assetUrl;
				element.type = "text/css";
				element.rel = "stylesheet";
				document.head.append(element);
				break;
			}
			case "js": {
				const element = document.createElement("script");
				element.type = "module";
				element.src = assetUrl;
				document.head.append(element);
				break;
			}
		}
	});
};

export { injectAssets };
