/**
 * Script that rewrites `env.json`.
 *
 * Is mainly used by CI.
 *
 * Usage from project root:
 *
 * node scripts/set-env.js [test|prod]
 */
const fs = require("fs");
const path = require("path");

// Changes this to reflect envs in /config/config.ts
const ENVS = ["test", "prod"];

let env = process.argv[2];

if (!env) {
  console.error("Missing env, pass env as first argument`");
  process.exit(1);
}

if (!ENVS.includes(env)) {
  console.error("Invalid env, should be one of", ENVS);
  process.exit(1);
}

const filePath = path.join(process.cwd(), "env.json");
const content = fs.readFileSync(filePath).toString("utf-8");
const json = JSON.parse(content || {});

json.env = env;

const jsonStr = JSON.stringify(json, null, 2);

fs.writeFileSync(filePath, jsonStr);

console.log("Updated config to", jsonStr, "in", filePath);
