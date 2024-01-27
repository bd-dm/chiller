const enumValues = (_enum: Record<string | number, unknown>): number[] => {
	return Object.values(_enum).filter(
		(value) => typeof value === "number",
	) as number[];
};

export { enumValues };
