import { isNull, isObject, isUndefined } from "lodash-es";

import { StorageMethods, StorageType } from "./types";

// Adapter for localStorage for environments where chrome.storage is not available
// For example, for storybook
const universalStorage = chrome.storage?.local ?? {
	get: localStorage.getItem.bind(localStorage),
	set: async (values: Record<string, string>): Promise<void> => {
		Object.entries(values).forEach(([key, value]) => {
			localStorage.setItem(key, String(value));
		});
	},
};

const get: StorageMethods["get"] = async (key) => {
	const data = await universalStorage.get(key);
	if (!data) {
		return null;
	}

	const value = data[key];
	if (!value) {
		return null;
	}

	return value;
};

const set: StorageMethods["set"] = async (key, value) =>
	await universalStorage.set({
		[key]: value,
	});

const getItem: StorageMethods["getItem"] = async (key, findFn) => {
	const items = await get<typeof key>(key);

	if (isNull(items)) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore https://github.com/microsoft/TypeScript/issues/44373
	return items.find(findFn);
};

const addItem: StorageMethods["addItem"] = async (key, item) => {
	const items = (await get(key)) ?? [];

	return await set(key, [...items, item] as StorageType<typeof key>);
};

const updateItem: StorageMethods["updateItem"] = async (
	key,
	findFn,
	updateData
) => {
	const items = await get<typeof key>(key);
	if (isNull(items)) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore https://github.com/microsoft/TypeScript/issues/44373
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
	if (isNull(items)) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore https://github.com/microsoft/TypeScript/issues/44373
	const itemIndex = items.findIndex(findFn);
	if (isUndefined(itemIndex) || itemIndex === -1) {
		return;
	}

	items.splice(itemIndex, 1);

	return await set(key, items);
};

const removeKey: StorageMethods["removeKey"] = async (key) => {
	await universalStorage.remove(key);
};

const storage: StorageMethods = {
	get,
	set,
	getItem,
	addItem,
	updateItem,
	removeItem,
	removeKey,
};

export { storage };
