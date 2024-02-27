import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";

export function clearFolder(folderPath) {
  const resolvedFolderPath = path.resolve(folderPath);

  //Check if the path exists
  if (!fs.existsSync(resolvedFolderPath)) {
    console.error(`Folder not found: ${resolvedFolderPath}`);
    return;
  }

  // Use rimraf to remove the folder and its contents
  rimraf.sync(resolvedFolderPath);

  console.log(`Folder cleared: ${resolvedFolderPath}`);
}
