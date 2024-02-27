/**
 * File: app
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description:Device Cleaner application
 */

import clui from "clui";
import chalk from "chalk";
import clear from "clear";
import Table from "cli-table";
const table = new Table({
  head: ["Sr.no", "Folder", "Size"],
  colWidths: [10, 50, 20],
});
const Spinner = clui.Spinner;
const configs = getConfig();

import { getConfig } from "./configuration/os-specific.config.js";
import { QuestionsPrompt } from "./inquirer.js";

import { Storage } from "./storage/storage.js";
import { formatBytes } from "./utils/utils.js";
import { Prompts } from "./prompts/prompts.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function main() {
  const prompts = new Prompts();
  const questionsPrompt = new QuestionsPrompt();
  const storage = new Storage();

  clear();
  const spinner = new Spinner("");

  spinner.start();
  await displayStorageData(storage, spinner);
  spinner.stop();

  let { deletionPaths } = await handleDeletionOptions(questionsPrompt, prompts);

  const confirmSelection = await questionsPrompt.prompt(
    prompts.promptOptionSelection(
      `Are you Sure to delete all ${JSON.stringify(
        deletionPaths.map((data) => data.name)
      )}`
    )
  );
  await handleDeletion(confirmSelection, spinner, deletionPaths, storage);
}

async function handleDeletion(
  confirmSelection,
  spinner,
  deletionPaths,
  storage
) {
  let totalSize = 0;

  if (confirmSelection.deletionOption === "YES") {
    spinner.start();

    for (const deletionPath of deletionPaths) {
      const size = await storage.clearDirectoryAndGetSize(
        deletionPath.filePath,
        true
      );
      totalSize += size;
    }

    console.log(
      chalk.blueBright(
        `Hurray ! You have freed total ${formatBytes(totalSize)} space `
      )
    );
    await delay(3000);
    spinner.stop();
  }
}

async function displayStorageData(storage, spinner) {
  let totalSize = 0;
  for (const index in configs) {
    const size = await storage.clearDirectoryAndGetSize(
      configs[index].filePath,
      false
    );
    table.push([+index + 1, configs[index].name, formatBytes(size)]);
    totalSize += size;
  }
  spinner.stop();
  console.log(table.toString());
  return totalSize;
}

/**
 * Method to handle deletion options
 * @param {*} questionsPrompt
 * @param {*} prompts
 * @returns
 */
async function handleDeletionOptions(questionsPrompt, prompts) {
  let deletionPaths = [];
  let promptSelection = await questionsPrompt.prompt(
    prompts.promptDeleteAllOrManually(`Select from below options `)
  );
  if (promptSelection.deletionOption === "Manually") {
    for (const config of configs) {
      let promptSelection = await questionsPrompt.prompt(
        prompts.promptOptionSelection(`Do you want to delete ${config.name} `)
      );
      if (promptSelection.deletionOption === "YES") {
        deletionPaths.push(config);
      }
    }
  } else {
    //delete all
    deletionPaths = configs;
  }

  return { deletionPaths };
}
