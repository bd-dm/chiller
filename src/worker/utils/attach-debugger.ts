import { detachDebugger } from "./detach-debugger";

const attachDebugger = async (
	target: chrome.debugger.Debuggee
): Promise<void> => {
	const attach = async () => chrome.debugger.attach(target, "1.3");

	// Listen for tab change and detach debugger if user left needed tab
	chrome.tabs.onActivated.addListener(async ({ tabId }) => {
		if (tabId === target.tabId) {
			await attach();
		} else {
			await detachDebugger(target);
		}
	});

	// Initial attach (on message sent from content)
	return await attach();
};

export { attachDebugger };
