const detachDebugger = async (
	target: chrome.debugger.Debuggee
): Promise<void> => chrome.debugger.detach(target);

export { detachDebugger };
