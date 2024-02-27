#! /usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

import { CLINAME } from "./constants/constant.js";
import { main } from "./app.js";

clear();

async function printCliName() {
  console.log(
    chalk.yellowBright(
      figlet.textSync(CLINAME, {
        horizontalLayout: "full",
      })
    )
  );
}

async function run() {
  await printCliName();
  await main();
}

run();
