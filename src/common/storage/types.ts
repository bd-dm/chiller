import { ScriptData } from "common/scripts";

import { StorageKeys } from "./enums";

type ArrayStorageKeys = StorageKeys.Scripts | StorageKeys.InjectedTabs;

type ArrayStorageItemType<Key extends ArrayStorageKeys> =
	Key extends StorageKeys.Scripts
		? ScriptData
		: Key extends StorageKeys.InjectedTabs
		? chrome.tabs.Tab["id"]
		: never;

type StorageType<Key extends StorageKeys> = ArrayStorageItemType<Key>[];

type ArrayStorageItemUpdateData<Key extends ArrayStorageKeys> =
	ArrayStorageItemType<Key> extends Record<string, unknown>
		? Partial<ArrayStorageItemType<Key>>
		: ArrayStorageItemType<Key>;

interface StorageMethods {
	get: <Key extends StorageKeys>(key: Key) => Promise<StorageType<Key> | null>;

	set: <Key extends StorageKeys>(
		key: Key,
		value: StorageType<Key>
	) => Promise<void>;

	addItem: <Key extends ArrayStorageKeys>(
		key: Key,
		item: ArrayStorageItemType<Key>
	) => Promise<void>;

	updateItem: <Key extends ArrayStorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageItemType<Key>) => boolean,
		updateData: ArrayStorageItemUpdateData<Key>
	) => void;

	removeItem: <Key extends ArrayStorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageItemType<Key>) => boolean
	) => void;

	removeKey: <Key extends StorageKeys>(key: Key) => Promise<void>;
}

export type { StorageMethods, StorageType };
