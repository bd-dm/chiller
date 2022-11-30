import { getScript } from "./get-script";
import { ScriptData } from "./types";

type ExportedScript = Omit<ScriptData, "id" | "addedTimestamp">;

const downloadJson = (name: string, json: string) => {
	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(json)}`;

	const downloadAnchorNode = document.createElement("a");
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", `${name} [Chiller].json`);

	document.body.appendChild(downloadAnchorNode);

	downloadAnchorNode.click();
	downloadAnchorNode.remove();
};

const exportScript = async (id: ScriptData["id"]): Promise<void> => {
	const script = await getScript(id);

	const { id: _, addedTimestamp: __, ...scriptData } = script;
	const dataToExport: ExportedScript = scriptData;

	const exportJSON = JSON.stringify(dataToExport as ExportedScript);

	downloadJson(scriptData.name, exportJSON);
};

export { exportScript };
