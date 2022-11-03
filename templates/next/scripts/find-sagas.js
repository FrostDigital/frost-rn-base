/**
 * Script scans files for sagas (stories) used by SagoBok
 * which is a home baked lightweight alternative to Storybook.
 *
 * Usage from project root:
 *
 * node scripts/scan-sagas.js [pattern] [destination]
 *
 * Example:
 *
 * node scripts/find-sagas.js "**\/*.story.tsx" ./sagobok/sagas.ts
 */
const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");

let pattern = process.argv[2];
let destination = process.argv[3];

if (!pattern) {
  console.error("Missing glob pattern for files to scan");
  process.exit(1);
}

if (!destination) {
  console.error("Missing destination to which scanned sagor/stories will be written");
  process.exit(1);
}

const filePath = path.join(process.cwd(), destination);

const files = glob.sync([pattern], {
  cwd: process.cwd(),
  onlyFiles: true,
});

const fileContent = `
export const sagas = [
  ${files.map(f => `require("${path.relative(path.basename(filePath), f)}").default`).join(",\n\t")}
];
`;

fs.writeFileSync(filePath, fileContent);

console.log(`Scanned ${files.length} saga(s), wrote to file`, destination);
