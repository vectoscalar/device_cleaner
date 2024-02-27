/**
 * File: getOsSpecificConfig
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description:
 */

import os from "os";
import { osTypes } from "./constants/constant.js";
import {
  WindowsFileSystem,
  MacFileSystem,
  LinuxFileSystem,
} from "./configuration/config.js";
const osType = os.type().toLowerCase();

export function getConfig() {
  let config = null;
  if (osType === osTypes.MACOS) {
    console.log("Operating System: macOS");
    config = MacFileSystem;
  } else if (osType === osTypes.WINDOWS) {
    console.log("Operating System: Windows");
    config = WindowsFileSystem;
  } else if (osType === osTypes.LINUX) {
    console.log("Operating System: Linux");
    config = LinuxFileSystem;
  } else {
    console.log("Operating System: Unknown");
  }

  return config;
}
