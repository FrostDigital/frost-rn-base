#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";
import checkForUpdate from "update-check";
import { createApp } from "./create-app";
import { kebabCaseToPascalCase } from "./helpers/rename-app";
import packageJson from "./package.json";

let projectPath: string = "";
let iosBundleIdentifier: string = "";
let androidAppId: string = "";
let template: string = "";
let templateBranch: string = "";

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => {
    projectPath = name;
  })
  .option("--template <template>", "Name of template", "default")
  .option("--branch <branch>", "Template branch", "main")
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<void> {
  const opts = program.opts();

  if (opts.template) {
    template = opts.template;

    console.log();
    console.log(`  ${chalk.yellowBright("Using template " + template)}`);
    console.log();
  }

  if (opts.branch) {
    templateBranch = opts.branch;

    console.log();
    console.log(
      `  ${chalk.yellowBright(
        "Using branch " + templateBranch + " for template"
      )}`
    );
    console.log();
  }

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      type: "text",
      name: "path",
      message: "What is your project named (kebab-cased)?",
      initial: "my-app",
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
    );
    console.log();
    console.log("For example:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("my-flink-app")}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const iosBundleIdentRes = await prompts({
    type: "text",
    name: "path",
    message: "What is your iOS bundle identifier?",
    initial: `se.frost.${kebabCaseToPascalCase(projectPath).toLowerCase()}`,
  });

  if (typeof iosBundleIdentRes.path === "string") {
    iosBundleIdentifier = iosBundleIdentRes.path.trim();
  }

  if (!iosBundleIdentifier) {
    console.log();
    console.log("Please specify the iOS bundle identifier");
    process.exit(1);
  }

  const androidAppIdRes = await prompts({
    type: "text",
    name: "path",
    message: "What is your android appId?",
    initial: iosBundleIdentifier.toLowerCase(),
  });

  if (typeof androidAppIdRes.path === "string") {
    androidAppId = androidAppIdRes.path.trim().toLowerCase();
  }

  if (!androidAppId) {
    console.log();
    console.log("Please specify the android appId");
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  // const projectName = path.basename(resolvedProjectPath);

  try {
    await createApp({
      appPath: resolvedProjectPath,
      iosBundleIdentifier,
      androidAppId,
      template,
      templateBranch,
    });
  } catch (reason) {
    // TODO: Remove this?
    throw reason;
  }
}

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      console.log();
      console.log(
        chalk.yellow.bold(
          "A new version of `create-frost-rn-app` is available!"
        )
      );
      console.log(
        "You can update by running: " +
          chalk.cyan("npm i -g create-frost-rn-app")
      );
      console.log();
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });

export default {};
