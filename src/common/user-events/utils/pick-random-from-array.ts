const pickRandomFromArray = <T>(array: T[]): T => {
	const randomIdx = Math.floor(Math.random() * array.length);

	return array[randomIdx];
};

export { pickRandomFromArray };
