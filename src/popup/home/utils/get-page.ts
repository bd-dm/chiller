import { storage, StorageKeys } from "common/storage";

import { Page } from "../enums";

const getPage = async (): Promise<Page> => {
	return (await storage.get(StorageKeys.Page)) as Page;
};

export { getPage };
