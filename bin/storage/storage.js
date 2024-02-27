/**
 * File: storage
 * Author: MANOJ.FULARA
 * Date: 12-02-2024
 * Description: Contains methods related to fs storage operations
 */

import { promises as fsPromises } from "fs";
import path from "path";

export class Storage {
  clearDirectoryAndGetSize = async (fullPath, deletion) => {
    try {
      const stats = await fsPromises.stat(fullPath);
      if (stats.isDirectory()) {
        const size = await this.calculateDirectorySize(fullPath, deletion);
        return size;
      } else {
        try {
          if (deletion) {
            await fsPromises.unlink(fullPath);
          }
          return stats.size;
        } catch (err) {
          return 0;
        }
      }
    } catch (error) {
      return 0;
    }
  };

  calculateDirectorySize = async (dirPath, deletion) => {
    let totalSize = 0;
    const files = await fsPromises.readdir(dirPath, { withHidden: true });

    const sizeList = await Promise.all(
      files.flatMap(async (file) => {
        const fullPath = path.join(dirPath, file);

        return await this.clearDirectoryAndGetSize(fullPath, deletion);
      })
    );
    sizeList?.forEach((size) => (totalSize += size));
    if (deletion) {
      try {
        await fsPromises.rmdir(dirPath);
      } catch (err) {}
    }
    return totalSize;
  };
}
