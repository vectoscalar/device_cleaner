/**
 * File: inquirer
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description: Method to ask prompt
 */

import inquirer from "inquirer";

export class QuestionsPrompt {
  prompt = (questions) => {
    return inquirer.prompt(questions);
  };
}
