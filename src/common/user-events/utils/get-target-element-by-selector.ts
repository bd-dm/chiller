import { isNull } from "lodash-es";
import { TargetElementData } from "../types";

const getTargetElementBySelector = <ElementType extends HTMLElement>(
	selector: string
): TargetElementData<ElementType> | null => {
	const element = document.querySelector<ElementType>(selector);

	if (isNull(element)) {
		const iframes = document.querySelectorAll("iframe");
		let elementInIframe: ElementType | null = null;
		let targetIframe: HTMLIFrameElement | null = null;

		iframes.forEach((iframe) => {
			const tryElement =
				iframe.contentDocument?.querySelector<ElementType>(selector);

			if (tryElement) {
				elementInIframe = tryElement;
				targetIframe = iframe;
			}
		});

		if (!isNull(elementInIframe)) {
			return { element: elementInIframe, iframe: targetIframe ?? undefined };
		}
	}

	if (isNull(element)) {
		return null;
	}

	return { element };
};

export { getTargetElementBySelector };
