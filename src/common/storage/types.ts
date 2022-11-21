import { StorageKeys } from "./enums";
import { Script } from "../scripts/types";

type ArrayStorageType<Key extends StorageKeys> = Key extends StorageKeys.Scripts
	? Script[]
	: Key extends StorageKeys.InjectedTabs
	? chrome.tabs.Tab["id"][]
	: never[];

type StorageType<Key extends StorageKeys> = ArrayStorageType<Key>;

interface StorageMethods {
	get: <Key extends StorageKeys>(key: Key) => Promise<StorageType<Key>>;
	set: <Key extends StorageKeys>(
		key: Key,
		value: StorageType<Key>
	) => Promise<void>;

	updateItem: <Key extends StorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageType<Key>[number]) => boolean,
		updateData: ArrayStorageType<Key>[number] extends Record<string, unknown>
			? Partial<ArrayStorageType<Key>[number]>
			: ArrayStorageType<Key>[number]
	) => void;

	removeItem: <Key extends StorageKeys>(
		key: Key,
		findFn: (item: ArrayStorageType<Key>[number]) => boolean
	) => void;

	removeKey: <Key extends StorageKeys>(key: Key) => Promise<void>;
}

export type { StorageType, StorageMethods };
