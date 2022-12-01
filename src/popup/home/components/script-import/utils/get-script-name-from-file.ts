import { ScriptData } from "../../../../../common/scripts";

const getScriptNameFromFile = async (file: File): Promise<string> => {
	const scriptText = await file.text();
	const { name } = JSON.parse(scriptText) as Pick<ScriptData, "name">;
	return name;
};

export { getScriptNameFromFile };
