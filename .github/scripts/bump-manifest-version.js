const path = require("node:path");
const fs = require("node:fs");

const [_, __, version] = process.argv;
const MANIFEST_PATH = path.resolve(__dirname, "../../public/manifest.json");

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH).toString());
manifest.version = version
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, '\t'))
