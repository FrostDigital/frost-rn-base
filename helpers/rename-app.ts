import { replaceInFile } from "replace-in-file";
import fs from "fs";

const allGlob = ["**/*"];

export async function renameApp(
  from: string,
  to: string,
  bundleIdentifier: string,
  androidAppId: string
) {
  // FrostRnBase
  const fromPascalCase = kebabCaseToPascalCase(from);
  const toPascalCase = kebabCaseToPascalCase(to);

  // frostrnbase
  const fromLowerCase = fromPascalCase.toLowerCase();
  const toLowerCase = toPascalCase.toLowerCase();

  const androidAppIdAsPath = androidAppId.replace(/\./g, "/");

  // Replace se.frost -> packageName in project.pbxproj
  await replaceInFile({
    from: new RegExp("se.frost.FrostRnBase", "g"),
    to: bundleIdentifier,
    files: ["**/*/project.pbxproj"],
  });

  // Replace se.frost.frostrnbase -> packageName.myapp in android files
  await replaceInFile({
    from: new RegExp("se.frost.frostrnbase", "g"),
    to: androidAppId,
    files: ["android/**/*"],
  });

  // Replace frost-rn-base -> my-app
  await replaceInFile({
    from: new RegExp(from, "g"),
    to,
    files: allGlob,
  });

  // Replace FrostRnBase -> MyApp
  await replaceInFile({
    from: new RegExp(fromPascalCase, "g"),
    to: toPascalCase,
    files: allGlob,
  });

  // Replace frostrnbase -> myapp
  await replaceInFile({
    from: new RegExp(fromLowerCase, "g"),
    to: toLowerCase,
    files: allGlob,
  });

  // iOS files
  [
    {
      from: `ios/${fromPascalCase}`,
      to: `ios/${toPascalCase}`,
    },
    {
      from: `ios/${fromPascalCase}.xcodeproj`,
      to: `ios/${toPascalCase}.xcodeproj`,
    },
    {
      from: `ios/${fromPascalCase}.xcworkspace`,
      to: `ios/${toPascalCase}.xcworkspace`,
    },
  ].map(rename);

  // Android files
  [
    {
      from: `android/app/src/main/java/se/frostrnbase`,
      to: `android/app/src/main/java/${androidAppIdAsPath}`,
    },
    {
      from: `android/app/src/debug/java/se/frostrnbase`,
      to: `android/app/src/debug/java/${androidAppIdAsPath}`,
    },
  ].map(rename);
}

// https://stackoverflow.com/a/54651317
export function kebabCaseToPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, "").toUpperCase();
}

function rename({ from, to }: { from: string; to: string }) {
  return fs.renameSync(from, to);
}
