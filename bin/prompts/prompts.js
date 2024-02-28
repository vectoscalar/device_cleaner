/**
 * File: prompts
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description: Contains prompts methods
 */

export class Prompts {
  validateNotEmpty = (value) => {
    return value.length ? true : "Please enter a valid value.";
  };

  promptDeleteAllOrManually = () => [
    {
      name: "Option",
      type: "list",
      message: "Select deletion options from below",
      choices: ["Manually", "Delete All"],
      validate: this.validateNotEmpty,
    },
  ];

  deletionPathOptions = () => [
    {
      name: "deletionCustomPaths",
      type: "input",
      message: "Please enter a list of deletion paths (comma-separated):",
      filter: (input) =>
        input
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item != ""),
      validate: this.validateNotEmpty,
    },
  ];

  promptOptionSelection = (message) => [
    {
      name: "Option",
      type: "list",
      message,
      choices: ["YES", "NO"],
      validate: this.validateNotEmpty,
    },
  ];
}
