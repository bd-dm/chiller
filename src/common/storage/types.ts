import { ScriptData } from "common/scripts";

import { StorageKeys } from "./enums";

type ArrayStorageKeys =
	| StorageKeys.Scripts
	| StorageKeys.InjectedTabs
	| StorageKeys.ScriptDrafts;

type ArrayStorageItemType<Key extends ArrayStorageKeys> =
	Key extends StorageKeys.Scripts
		? ScriptData
		: Key extends StorageKeys.InjectedTabs
			? chrome.tabs.Tab["id"]
			: Key extends StorageKeys.ScriptDrafts
				? ScriptData
				: never;

type PlainStorageKeys = StorageKeys.Page;
type PlainStorageItemType<Key extends PlainStorageKeys> =
	Key extends StorageKeys.Page ? string : never;

type StorageType<Key extends StorageKeys> = Key extends ArrayStorageKeys
	? ArrayStorageItemType<Key>[]
	: Key extends PlainStorageKeys
		? PlainStorageItemType<Key>
		: never;

type ArrayStorageItemUpdateData<Key extends ArrayStorageKeys> =
	ArrayStorageItemType<Key> extends Record<string, unknown>
		? Partial<ArrayStorageItemType<Key>>
		: ArrayStorageItemType<Key>;

interface StorageMethods {
	get: <Key extends StorageKeys>(key: Key) => Promise<StorageType<Key> | null>;

	set: <Key extends StorageKeys>(
		key: Key,
		value: StorageType<Key>,
	) => Promise<void>;

	getItem: <
		Key extends ArrayStorageKeys,
		ItemType extends ArrayStorageItemType<Key>,
	>(
		key: Key,
		findFn: (item: ItemType) => boolean,
	) => Promise<ItemType | null>;

	addItem: <Key extends ArrayStorageKeys>(
		key: Key,
		item: ArrayStorageItemType<Key>,
	) => Promise<void>;

	updateItem: <Key extends ArrayStorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageItemType<Key>) => boolean,
		updateData: ArrayStorageItemUpdateData<Key>,
	) => void;

	removeItem: <Key extends ArrayStorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageItemType<Key>) => boolean,
	) => void;

	removeKey: <Key extends StorageKeys>(key: Key) => Promise<void>;
}

export type { ArrayStorageItemType, StorageMethods, StorageType };
