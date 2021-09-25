/* eslint-disable import/no-extraneous-dependencies */
import chalk from "chalk";
import cpy from "cpy";
import fs from "fs";
import os from "os";
import path from "path";
import { tryGitInit } from "./helpers/git";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { isWriteable } from "./helpers/is-writeable";
import { makeDir } from "./helpers/make-dir";
import { download } from "./helpers/git-download";

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

  // const packageJson = {
  //   name: appName,
  //   version: "0.1.0",
  //   private: true,
  //   scripts: {
  //     dev: 'nodemon --exec "flink run"',
  //     test: "flink run --entry spec/support/runner.ts",
  //     "test:watch": 'nodemon --exec "flink run --entry spec/support/runner.ts"',
  //     start: "flink run",
  //     build: "flink build",
  //     clean: "flink clean && rimraf dist",
  //   },
  // };
  // fs.writeFileSync(
  //   path.join(root, "package.json"),
  //   JSON.stringify(packageJson, null, 2) + os.EOL
  // );

  console.log(`Downloading template project...`);
  console.log();

  await download("FrostDigital/frost-rn-base", "./", "./");

  console.log(`Installing dependencies using npm...`);
  console.log();

  await install();
  console.log();

  // await cpy("**", root, {
  //   parents: true,
  //   cwd: path.join(__dirname, "templates", "default"),
  //   rename: (name) => {
  //     switch (name) {
  //       case "gitignore": {
  //         return ".".concat(name);
  //       }
  //       // README.md is ignored by webpack-asset-relocator-loader used by ncc:
  //       // https://github.com/zeit/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
  //       case "README-template.md": {
  //         return "README.md";
  //       }
  //       default: {
  //         return name;
  //       }
  //     }
  //   },
  // });

  // if (tryGitInit(root)) {
  //   console.log("Initialized a git repository.");
  //   console.log();
  // }

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
  // console.log("We suggest that you begin by typing:");
  // console.log();
  // console.log(chalk.cyan("  cd"), cdpath);
  // console.log(`  ${chalk.cyan(`npm run dev`)}`);
  // console.log();
}
