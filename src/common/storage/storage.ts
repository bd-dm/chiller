import { StorageMethods } from "./types";
import { isObject, isUndefined } from "lodash-es";

const get: StorageMethods["get"] = async (key) =>
	(await chrome.storage.sync.get(key))[key];

const set: StorageMethods["set"] = async (key, value) =>
	await chrome.storage.sync.set({
		[key]: value,
	});

const updateItem: StorageMethods["updateItem"] = async (
	key,
	findFn,
	updateData
) => {
	const items = await get(key);
	if (!items) {
		return;
	}

	const itemIndex = items.findIndex(findFn);
	if (isUndefined(itemIndex) && itemIndex !== -1) {
		return;
	}

	const currentItem = items[itemIndex];
	if (isUndefined(currentItem)) {
		return;
	}

	items[itemIndex] =
		isObject(updateData) && isObject(currentItem)
			? { ...currentItem, ...updateData }
			: (updateData as typeof currentItem);

	return await set(key, items);
};

const removeItem: StorageMethods["removeItem"] = async (key, findFn) => {
	const items = await get(key);
	if (!items) {
		return;
	}

	const itemIndex = items.findIndex(findFn);
	if (isUndefined(itemIndex) && itemIndex !== -1) {
		return;
	}

	items.splice(itemIndex, 1);

	return items;
};

const removeKey: StorageMethods["removeKey"] = async (key) => {
	await chrome.storage.sync.remove(key);
};

const storage: StorageMethods = {
	get,
	set,
	updateItem,
	removeItem,
	removeKey,
};

export { storage };
