import { replaceInFile } from "replace-in-file";
import fs from "fs";

export async function renameApp(from: string, to: string) {
  // FrostRnBase
  const fromPascalCase = kebabCaseToPascalCase(from);
  const toPascalCase = kebabCaseToPascalCase(to);

  // frostrnbase
  const fromLowerCase = fromPascalCase.toLowerCase();
  const toLowerCase = toPascalCase.toLowerCase();

  const glob = ["**/*"];

  // Replace frost-rn-base -> my-app
  await replaceInFile({
    from: new RegExp(from, "g"),
    to,
    files: glob,
  });

  // Replace FrostRnBase -> MyApp
  const res = await replaceInFile({
    from: new RegExp(fromPascalCase, "g"),
    to: toPascalCase,
    files: glob,
  });

  // Replace frostrnbase -> myapp
  await replaceInFile({
    from: new RegExp(fromLowerCase, "g"),
    to: toLowerCase,
    files: glob,
  });

  [
    // iOS files
    {
      from: `ios/${fromPascalCase}`,
      to: `ios/${toPascalCase}`,
    },
    {
      from: `ios/${fromPascalCase}.xcodeproj`,
      to: `ios/${toPascalCase}.xcodeproj`,
    },
    {
      from: `ios/${fromPascalCase}.xcodeproj`,
      to: `ios/${toPascalCase}.xcodeproj`,
    },
  ];
}

// https://stackoverflow.com/a/54651317
function kebabCaseToPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, "").toUpperCase();
}

function rename({ from, to }: { from: string; to: string }) {
  return fs.renameSync(from, to);
}
