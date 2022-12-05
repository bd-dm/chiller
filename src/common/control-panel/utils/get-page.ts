import { storage, StorageKeys } from "common/storage";

import { Page } from "../enums";

const getPage = async (): Promise<Page | null> => {
	return ((await storage.get(StorageKeys.Page)) ?? null) as Page | null;
};

export { getPage };
