/* eslint-disable import/no-extraneous-dependencies */
import chalk from "chalk";
import path from "path";
import { tryGitInit } from "./helpers/git";
import { download } from "./helpers/git-download";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { isWriteable } from "./helpers/is-writeable";
import { makeDir } from "./helpers/make-dir";

export async function createApp({
  appPath,
}: {
  appPath: string;
}): Promise<void> {
  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const originalDirectory = process.cwd();

  console.log(`Creating a new RN app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  console.log(`Downloading template project...`);
  console.log();

  await download({
    org: "FrostDigital",
    repo: "frost-rn-base",
    dest: "./",
    subdir: "templates/default",
  });

  console.log(`Installing dependencies using npm...`);
  console.log();

  await install();
  console.log();

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  npm run ios`));
  console.log("    Starts the app in iOS simulator.");
  console.log();
  console.log(chalk.cyan(`  npm run android`));
  console.log("    Starts the app in Android simulator.");
  console.log();
  console.log(chalk.cyan(`  npm start`));
  console.log("    Starts metro bundler.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdpath);
  console.log(`  ${chalk.cyan(`npx pod-install && npm run ios`)}`);
  console.log();
}
