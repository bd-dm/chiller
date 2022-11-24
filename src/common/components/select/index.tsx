import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import { Column } from "../column";
import styles from "./index.module.scss";
import commonStyles from "../../styles/index.module.scss";
import { Button } from "../button";
import { isNull, isUndefined } from "lodash-es";

interface SelectOption {
	value: string;
	name: string;
}

interface SelectProps {
	placeholder?: string;
	options: SelectOption[];
	initialValue?: SelectOption["value"];
	onChange?: (value: SelectOption["value"]) => void;
}

const KEY_DOWN_ARROW = 40;
const KEY_UP_ARROW = 38;

const Select: Component<SelectProps> = (props) => {
	const getOption = (
		value: SelectOption["value"] | undefined
	): SelectOption | null => {
		return props.options.find((option) => option.value === value) ?? null;
	};

	const [value, setValue] = createSignal(getOption(props.initialValue)?.value);
	const [manualInput, setManualInput] = createSignal("");
	const [deferredManualInput, setDeferredManualInput] = createSignal("");
	const [contentRef, setContentRef] = createSignal<HTMLDivElement>();
	const [listRef, setListRef] = createSignal<HTMLUListElement>();

	const currentOption = () => getOption(value());
	const filteredOptions = () =>
		props.options.filter(({ name }) =>
			name.toLowerCase().includes(manualInput().toLowerCase())
		);
	const updateContent = () => {
		const contentElement = contentRef();
		if (contentElement) {
			contentElement.textContent = deferredManualInput();
		}
	};

	onMount(updateContent);
	createEffect(updateContent);

	createEffect(() => {
		const option = currentOption();

		if (!isNull(option)) {
			setManualInput(option.name);
			setDeferredManualInput(option.name);
		}
	});

	const selectHandler = (newValue: SelectOption["value"]): void => {
		setValue(newValue);
		if (!isUndefined(props.onChange)) {
			props.onChange(newValue);
		}
		(document.activeElement as HTMLElement).blur();
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

	return (
		<Column gapLess horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<div class={styles.select}>
				<div
					ref={setContentRef}
					class={commonStyles.inputLike}
					onKeyDown={(e) => {
						if (e.keyCode === KEY_DOWN_ARROW) {
							focusNext(
								(listRef()?.firstChild?.firstChild as HTMLElement) ?? undefined
							);
						}
					}}
					onInput={({ currentTarget: { textContent } }) =>
						setManualInput(textContent ?? "")
					}
					onBlur={() => {
						setDeferredManualInput(getOption(value())?.name ?? "");
					}}
					data-placeholder={props.placeholder ?? " "}
					contentEditable
				/>

				<div class={styles.suggestionsWrapper}>
					<div class={styles.suggestions}>
						<ul class={styles.suggestionsList} ref={setListRef}>
							<For each={filteredOptions()}>
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
