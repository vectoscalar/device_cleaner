/**
 * File: storage
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description: Contains methods related to fs storage operations
 */

import { promises as fsPromises } from "fs";
import path from "path";
import chalk from "chalk";

export class Storage {
  clearDirectoryAndGetSize = async (fullPath) => {
    try {
      const stats = await fsPromises.stat(fullPath);
      if (stats.isDirectory()) {
        const size = await this.calculateDirectorySize(fullPath);
        return size;
      } else {
        try {
          await fsPromises.unlink(fullPath);
          return stats.size;
        } catch (err) {
          console.log(`Skipping Busy files ${fullPath}`, err.message);
          return 0;
        }
      }
    } catch (error) {
      console.error(
        chalk.redBright(
          `Error retrieving storage information for ${fullPath}: ${error}`
        )
      );
      return 0;
    }
  };

  calculateDirectorySize = async (dirPath) => {
    let totalSize = 0;
    const files = await fsPromises.readdir(dirPath, { withHidden: true });

    const sizeList = await Promise.all(
      files.flatMap(async (file) => {
        const fullPath = path.join(dirPath, file);

        return await this.clearDirectoryAndGetSize(fullPath);
      })
    );
    sizeList?.forEach((size) => (totalSize += size));
    try {
      await fsPromises.rmdir(dirPath);
    } catch (err) {
      console.error(`Error deleting directory ${dirPath}`, err.message);
    }
    return totalSize;
  };
}
