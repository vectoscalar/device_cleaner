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

  promptCustomOrConfigPathSelection = () => [
    {
      name: "deletionOption",
      type: "list",
      message: "Select deletion options from below",
      choices: ["PreDefinedPaths", "CustomPaths"],
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
      name: "deletionOption",
      type: "list",
      message,
      choices: ["YES", "NO"],
      validate: this.validateNotEmpty,
    },
  ];
}
