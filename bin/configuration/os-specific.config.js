/**
 * File: getOsSpecificConfig
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description: Contains method to get predefined config by os type
 */

import os from "os";
import { OS_TYPES } from "../constants/constant.js";
import { WindowsFileSystem, MacFileSystem, LinuxFileSystem } from "./config.js";
const osType = os.type().toLowerCase();

export function getConfig() {
  let config = null;

  switch (osType) {
    case OS_TYPES.WINDOWS:
      console.log("Operating System: Windows");
      config = WindowsFileSystem;
      break;
    case OS_TYPES.MACOS:
      console.log("Operating System: macOS");
      config = MacFileSystem;
      break;
    case OS_TYPES.LINUX:
      console.log("Operating System: Linux");
      config = LinuxFileSystem;
      break;
    default:
      console.error("Operating System: not supported os:", osType);
      throw new Error("Operating System: not supported", osType);
  }

  return config;
}
