import { isNull } from "lodash-es";

import { TargetElementData } from "../types";

const getTargetElementByText = <ElementType extends HTMLElement>(
	text: string,
): TargetElementData<ElementType> | null => {
	const element = document
		.evaluate(`//*[contains(text(), '${text}')]`, document)
		.iterateNext() as ElementType | null;

	if (isNull(element)) {
		const iframes = document.querySelectorAll("iframe");
		let elementInIframe: ElementType | null = null;
		let targetIframe: HTMLIFrameElement | null = null;

		iframes.forEach((iframe) => {
			if (isNull(iframe.contentDocument)) {
				return;
			}

			const tryElement = document
				.evaluate(`//*[contains(text(), ${text})]`, iframe.contentDocument)
				.iterateNext() as ElementType | null;

			if (tryElement) {
				elementInIframe = tryElement;
				targetIframe = iframe;
			}
		});

		if (!isNull(elementInIframe)) {
			return { element: elementInIframe, iframe: targetIframe ?? undefined };
		}

		return null;
	}

	return { element };
};

export { getTargetElementByText };
