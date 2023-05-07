enum IllustrationName {
	Empty = "empty",
	Import = "import",
}

const ILLUSTRATION_NAME_TO_PATH = {
	[IllustrationName.Empty]: "/illustrations/empty-list.png",
	[IllustrationName.Import]: "/illustrations/import.png",
};

export { ILLUSTRATION_NAME_TO_PATH, IllustrationName };
