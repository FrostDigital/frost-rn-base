import fsExtra from "fs-extra";
import { replaceInFile } from "replace-in-file";

const allGlob = ["**/*"];
const ignoreGlob = [
  "**/*/google-services.json",
  "**/*/GoogleService-Info.plist",
];

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

  // Replace se/frost/frostrnbase -> packageName/myapp in android files
  // Used in jni files, for example MainComponentsRegistry
  await replaceInFile({
    from: new RegExp("se/frost/frostrnbase", "g"),
    to: androidAppIdAsPath,
    files: ["android/**/*"],
  });

  // Replace frost-rn-base -> my-app
  await replaceInFile({
    from: new RegExp(from, "g"),
    to,
    files: allGlob,
    ignore: ignoreGlob,
  });

  // Replace FrostRnBase -> MyApp
  await replaceInFile({
    from: new RegExp(fromPascalCase, "g"),
    to: toPascalCase,
    files: allGlob,
    ignore: ignoreGlob,
  });

  // Replace frostrnbase -> myapp
  await replaceInFile({
    from: new RegExp(fromLowerCase, "g"),
    to: toLowerCase,
    files: allGlob,
    ignore: ignoreGlob,
  });

  // NOTE: The special processing below of firebase config files is due to
  // the fact that the app will not start if the package name is incorrect.
  // However this will not make Firebase work, the user still needs to
  // provide their own config files and setup the project in Firebase.

  // Replace only package id in android Firebase config
  await replaceInFile({
    from: new RegExp("se.frost.frostrnbase", "g"),
    to: bundleIdentifier,
    files: ["android/app/google-services.json"],
  });

  // Replace only package id in iOS Firebase config
  await replaceInFile({
    from: new RegExp("se.frost.FrostRnBase", "g"),
    to: bundleIdentifier,
    files: ["ios/GoogleService-Info.plist"],
  });

  // Rename/move iOS files
  [
    // note: this must run before folder is renamed below
    {
      from: `ios/${fromPascalCase}/${fromPascalCase}.entitlements`,
      to: `ios/${fromPascalCase}/${toPascalCase}.entitlements`,
    },
    {
      from: `ios/${fromPascalCase}`,
      to: `ios/${toPascalCase}`,
    },
    {
      // note: this must run before xcodeproj is renamed below
      from: `ios/${fromPascalCase}.xcodeproj/xcshareddata/xcschemes/${fromPascalCase}.xcscheme`,
      to: `ios/${fromPascalCase}.xcodeproj/xcshareddata/xcschemes/${toPascalCase}.xcscheme`,
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

  // Rename/move Android files
  [
    {
      from: `android/app/src/main/java/se/frost/frostrnbase`,
      to: `android/app/src/main/java/${androidAppIdAsPath}`,
    },
    {
      from: `android/app/src/debug/java/se/frost/frostrnbase`,
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
  // Check first if the file/folder exists
  if (!fsExtra.existsSync(from)) {
    console.warn(`File/folder does not exist: ${from} - this might be OK`);
    return;
  }
  return fsExtra.moveSync(from, to, { overwrite: true });
}
