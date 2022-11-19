// const injectScript = (path: string): void => {
// 	const element = document.createElement("script");
// 	element.setAttribute("type", "module");
// 	element.setAttribute("src", chrome.extension.getURL(path));
// 	const head =
// 		document.head ||
// 		document.getElementsByTagName("head")[0] ||
// 		document.documentElement;
// 	head.insertBefore(element, head.lastChild);
// };

const injectAssets = async (): Promise<void> => {
	const assetsManifestUrl = chrome.extension.getURL("assets-manifest.json");
	const assetsManifest = await fetch(assetsManifestUrl);
	console.log(assetsManifest);
};

export { injectAssets };
