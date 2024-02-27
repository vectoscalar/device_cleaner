/**
 * File: getStorageInfo
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description:
 */

import { promises as fsPromises } from "fs";
import chalk from "chalk";
// Specify the path to the drive or directory you want to check

export async function getStorageInfo(fullPath) {
  try {
    const stats = await fsPromises.stat(fullPath);
    if (stats.isDirectory()) {
      return await calculateDirectorySize(fullPath);
    } else {
      return stats.size;
    }
  } catch (error) {
    console.error(
      chalk.redBright(
        `Error retrieving storage information for ${fullPath}: ${error}`
      )
    );
    return 0;
  }
}

async function calculateDirectorySize(path) {
  let totalSize = 0;
  const files = await fsPromises.readdir(path, { withHidden: true });

  const sizeList = await Promise.all(
    files.flatMap(async (file) => {
      const fullPath = `${path}/${file}`;

      return await getStorageInfo(fullPath);
    })
  );
  sizeList?.forEach((size) => (totalSize += size));

  return totalSize;
}
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
