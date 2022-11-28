import { Button, Column } from "common/components";
import commonStyles from "common/styles/index.module.scss";
import { isNull, isUndefined } from "lodash-es";
import { createEffect, createSignal, For, onMount } from "solid-js";

import styles from "./index.module.scss";

interface SelectOption {
	value: string;
	name: string;
}

interface SelectProps<OptionType extends SelectOption = SelectOption> {
	placeholder?: string;
	disabled?: boolean;
	options: OptionType[];
	initialValue?: OptionType["value"];
	onChange?: (value: OptionType["value"] | null) => void;
}

const KEY_DOWN_ARROW = 40;
const KEY_UP_ARROW = 38;
const KEY_ESCAPE = 27;

const Select = <OptionType extends SelectOption = SelectOption>(
	props: SelectProps<OptionType>
) => {
	const getOption = (value: OptionType["value"] | null): OptionType | null => {
		return props.options.find((option) => option.value === value) ?? null;
	};
	const getValueWithFallback = () =>
		getOption(props.initialValue ?? null)?.value ?? null;

	const [value, setValue] = createSignal<OptionType["value"] | null>(
		getValueWithFallback()
	);
	const [manualInput, setManualInput] = createSignal("");
	const [deferredManualInput, setDeferredManualInput] = createSignal("");
	const [contentRef, setContentRef] = createSignal<HTMLDivElement>();
	const [listRef, setListRef] = createSignal<HTMLUListElement>();

	createEffect(() => {
		setValue(getValueWithFallback());
	});

	const currentOption = () => getOption(value());
	const filteredOptions = () =>
		props.options.filter(({ name }) =>
			name.toLowerCase().includes(manualInput().toLowerCase())
		);
	const updateContent = () => {
		const contentElement = contentRef();
		if (contentElement) {
			contentElement.textContent = deferredManualInput().trim();
		}
	};
	const updateInputs = () => {
		const option = currentOption();

		if (!isNull(option)) {
			setManualInput(option.name);
			setDeferredManualInput(option.name);
		} else {
			setManualInput("");
			setDeferredManualInput("");
		}
	};

	onMount(updateContent);
	onMount(updateInputs);
	createEffect(updateContent);
	createEffect(updateInputs);

	const selectHandler = (
		newValue: OptionType["value"] | null,
		shouldBlur = true
	): void => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore Expects fn, but we pass value
		setValue(newValue);
		if (!isUndefined(props.onChange)) {
			props.onChange(newValue);
		}
		if (shouldBlur) {
			(document.activeElement as HTMLElement).blur();
		}
	};

	const focusNext = (node?: HTMLElement) => {
		if (node) {
			node.focus();
			return;
		}

		const currentFocusedButton = document.querySelector(
			`.${styles.suggestionsList} li>button:focus`
		);
		const targetButton = currentFocusedButton?.parentNode?.nextSibling
			?.firstChild as HTMLElement | undefined;
		if (targetButton) {
			targetButton.focus();
		}
	};

	const focusPrevious = (node?: HTMLElement) => {
		if (node) {
			node.focus();
			return;
		}

		const currentFocusedButton = document.querySelector(
			`.${styles.suggestionsList} li>button:focus`
		);
		const targetButton = currentFocusedButton?.parentNode?.previousSibling
			?.firstChild as HTMLElement | undefined;
		if (targetButton) {
			targetButton.focus();
		}
	};

	const closeSuggestions = () => {
		(document.activeElement as HTMLElement).blur();
	};

	return (
		<Column gapLess horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<div
				class={styles.select}
				role={"listbox"}
				aria-label={props.placeholder}
			>
				<div
					ref={setContentRef}
					classList={{ [commonStyles.inputLike]: true, [styles.input]: true }}
					onKeyDown={(e) => {
						if (e.keyCode === KEY_DOWN_ARROW) {
							focusNext(
								(listRef()?.firstChild?.firstChild as HTMLElement) ?? undefined
							);
						} else if (e.keyCode === KEY_ESCAPE) {
							e.preventDefault();
							closeSuggestions();
						}
					}}
					onInput={({ currentTarget: { textContent } }) => {
						setManualInput(textContent ?? "");

						if (textContent?.trim() === "") {
							selectHandler(null, false);
						}
					}}
					onBlur={updateContent}
					data-placeholder={props.placeholder ?? " "}
					contentEditable={!props.disabled}
				/>

				<div class={styles.suggestionsWrapper}>
					<div class={styles.suggestions}>
						<ul class={styles.suggestionsList} ref={setListRef}>
							<For
								each={
									manualInput() === deferredManualInput()
										? props.options
										: filteredOptions()
								}
							>
								{({ value: itemValue, name }, index) => (
									<li class={styles.item}>
										<Button
											notStyled
											classList={{ [styles.itemButton]: true }}
											type={"button"}
											onKeyDown={(e) => {
												if (e.keyCode === KEY_DOWN_ARROW) {
													focusNext();
												} else if (e.keyCode === KEY_UP_ARROW) {
													focusPrevious(
														index() === 0 ? contentRef() : undefined
													);
												} else if (e.keyCode === KEY_ESCAPE) {
													e.preventDefault();
													closeSuggestions();
												}
											}}
											onClick={() => selectHandler(itemValue)}
										>
											{name}
										</Button>
									</li>
								)}
							</For>
						</ul>
					</div>
				</div>
			</div>
		</Column>
	);
};

export { Select };
export type { SelectOption };
