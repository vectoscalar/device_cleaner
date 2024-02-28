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
import { DELETION_OPTION, PROMPT_SELECTION } from "./constants/constant.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function main() {
  const prompts = new Prompts();
  const questionsPrompt = new QuestionsPrompt();
  const storage = new Storage();

  clear();
  const spinner = new Spinner("");

  spinner.start();
  const configWithData = await displayStorageData(storage, spinner);
  spinner.stop();

  let { deletionPaths } = await handleDeletionOptions(
    questionsPrompt,
    prompts,
    configWithData
  );

  const confirmSelection = await questionsPrompt.prompt(
    prompts.promptOptionSelection(
      `Are you Sure to delete all ${JSON.stringify(
        deletionPaths.map((data) => data.name)
      )}`
    )
  );
  await handleDeletion(confirmSelection, spinner, deletionPaths, storage);
}

/**
 * Method to handle deletion of files and folders
 * @param {*} confirmSelection
 * @param {*} spinner
 * @param {*} deletionPaths
 * @param {*} storage
 */
async function handleDeletion(
  confirmSelection,
  spinner,
  deletionPaths,
  storage
) {
  let totalSize = 0;

  if (confirmSelection.Option === PROMPT_SELECTION.YES) {
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

/**
 * Method to display Storage information
 * @param {*} storage
 * @param {*} spinner
 * @returns
 */
async function displayStorageData(storage, spinner) {
  let totalSize = 0;
  let configWithData = [];
  for (const index in configs) {
    const size = await storage.clearDirectoryAndGetSize(
      configs[index].filePath,
      false
    );
    if (size !== 0) {
      table.push([+index + 1, configs[index].name, formatBytes(size)]);
      configWithData.push(configs[index]);
      totalSize += size;
    }
  }
  spinner.stop();
  console.log(table.toString());
  return configWithData;
}

/**
 * Method to handle deletion options
 * @param {*} questionsPrompt
 * @param {*} prompts
 * @returns
 */
async function handleDeletionOptions(questionsPrompt, prompts, configWithData) {
  let deletionPaths = [];
  let promptSelection = await questionsPrompt.prompt(
    prompts.promptDeleteAllOrManually(`Select from below options `)
  );
  if (promptSelection.Option === DELETION_OPTION.MANUALLY) {
    for (const config of configWithData) {
      let promptSelection = await questionsPrompt.prompt(
        prompts.promptOptionSelection(`Do you want to delete ${config.name} `)
      );
      if (promptSelection.Option === PROMPT_SELECTION.YES) {
        deletionPaths.push(config);
      }
    }
  } else {
    //delete all
    deletionPaths = configWithData;
  }

  return { deletionPaths };
}
