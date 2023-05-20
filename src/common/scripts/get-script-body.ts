import { ScriptBody, ScriptData } from "./types";

const getScriptBody = ({ body }: Pick<ScriptData, "body">): ScriptBody => {
	return JSON.parse(body) as ScriptBody;
};

export { getScriptBody };
