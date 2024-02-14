/**
 * File: app
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description:Device Cleaner application
 */

import clui from "clui";
import chalk from "chalk";
import clear from "clear";
const Spinner = clui.Spinner;

import { getConfig } from "./configuration/os-specific.config.js";
import { QuestionsPrompt } from "./inquirer.js";

import { Storage } from "./storage/storage.js";
import { formatBytes } from "./utils/utils.js";
import { Prompts } from "./prompts/prompts.js";
import { DELETION_OPTION } from "./constants/constant.js";

export async function main() {
  const prompts = new Prompts();
  const questionsPrompt = new QuestionsPrompt();
  const storage = new Storage();

  let { deletionPaths, deletionOption } = await handleDeletionOptions(
    questionsPrompt,
    prompts
  );

  deletionPaths = deletionPaths.filter(
    (deletionPath) =>
      deletionPath.deletionOption === "YES" ||
      deletionOption === DELETION_OPTION.CUSTOM_PATHS
  );

  const pathsNameToDelete = deletionPaths.map(
    (deletionPath) => deletionPath.name || deletionPath
  );
  const confirmSelection = await questionsPrompt.prompt(
    prompts.promptOptionSelection(
      `Are you Sure to delete all ${JSON.stringify(pathsNameToDelete)}`
    )
  );

  let totalSize = 0;
  clear();
  const spinner = new Spinner("processing...");
  if (confirmSelection.deletionOption === "YES") {
    spinner.start();

    for (const deletionPath of deletionPaths) {
      const size = await storage.clearDirectoryAndGetSize(
        deletionPath.filePath || deletionPath
      );
      totalSize += size;
      console.log(
        `clearing storage ${formatBytes(size)} from ${
          deletionPath.filePath || deletionPath
        }`
      );
    }
    spinner.stop();
    console.log(
      chalk.blueBright(`You have freed total ${formatBytes(totalSize)} space `)
    );
  }
}

/**
 * Method to handle deletion options
 * @param {*} questionsPrompt
 * @param {*} prompts
 * @returns
 */
async function handleDeletionOptions(questionsPrompt, prompts) {
  const deletionPathCustomOrConfig = await questionsPrompt.prompt(
    prompts.promptCustomOrConfigPathSelection()
  );

  const { deletionOption } = deletionPathCustomOrConfig;

  let deletionPaths = [];

  if (deletionOption === DELETION_OPTION.CUSTOM_PATHS) {
    const customDeletionPaths = await questionsPrompt.prompt(
      prompts.deletionPathOptions()
    );

    deletionPaths = customDeletionPaths.deletionCustomPaths;
  } else if (deletionOption === DELETION_OPTION.PRE_DEFINED_PATHS) {
    const configs = getConfig();

    for (const config of configs) {
      let promptSelection = await questionsPrompt.prompt(
        prompts.promptOptionSelection(
          `Do you want to delete ${config.name} from path: ${config.filePath}`
        )
      );
      deletionPaths.push({ ...promptSelection, ...config });
    }
  }
  return { deletionPaths, deletionOption };
}
