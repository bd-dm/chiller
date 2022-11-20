import { getSavedInjectedTabs } from "./get-saved-injected-tabs";
import { getCurrentTab } from "./get-current-tab";
import { isUndefined } from "lodash-es";
import { injectContent } from "./inject-content";

const restoreContentInjection = async () => {
	const prevInjectedTabs = await getSavedInjectedTabs();
	const tab = await getCurrentTab();

	if (isUndefined(tab) || isUndefined(tab.id)) {
		return;
	}

	if (prevInjectedTabs.includes(tab.id)) {
		await injectContent(tab.id);
	}
};

export { restoreContentInjection };
