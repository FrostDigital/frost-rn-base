/**
 * Gets the current git hash and saves to env.json file
 */
const fs = require("fs");
const path = require("path");

function getGitHash() {
  try {
    const rev = fs.readFileSync(".git/HEAD").toString().trim();
    if (rev.indexOf(":") === -1) {
      return rev;
    } else {
      return fs
        .readFileSync(".git/" + rev.substring(5))
        .toString()
        .trim();
    }
  } catch (err) {
    console.log(err);
    return "n/a";
  }
}

const filePath = path.join(process.cwd(), "env.json");
const content = fs.readFileSync(filePath).toString("utf-8");
const json = JSON.parse(content || {});

json.gitHash = getGitHash();

const jsonStr = JSON.stringify(json, null, 2);

fs.writeFileSync(filePath, jsonStr);

console.log("Updated config to", jsonStr, "in", filePath);
