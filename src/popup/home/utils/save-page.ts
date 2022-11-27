import { storage, StorageKeys } from "common/storage";

import { Page } from "../enums";

const savePage = async (page: Page): Promise<void> => {
	await storage.set(StorageKeys.Page, page);
};

export { savePage };
