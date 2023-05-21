const getAsset = (asset: string) => {
	return chrome.runtime?.getURL ? chrome.runtime.getURL(asset) : asset;
};

export { getAsset };
