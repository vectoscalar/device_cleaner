import os from "os";
import path from "path";

const homeDirectory = os.homedir();
const tempDirectory = os.tmpdir();
export const WindowsFileSystem = [
  {
    name: "lelinux",
    filePath: path.join(homeDirectory, "Desktop", "lelinux"),
  },
  {
    name: "TEMP",
    filePath: path.join(tempDirectory),
  },
  {
    name: "tmp",
    filePath: "C:\\tmp",
  },
  {
    name: "debug",
    filePath: path.join(process.env.SystemRoot || "", "debug"),
  },
  {
    name: "Google Chrome browser Cache",
    filePath: path.join(
      homeDirectory,
      "AppData",
      "Local",
      "Google",
      "Chrome",
      "User Data",
      "Default",
      "Cache"
    ),
  },
  {
    name: "Global Node Modules",
    filePath: path.join(
      homeDirectory,
      "AppData",
      "Roaming",
      "npm",
      "node_modules"
    ),
  },
  {
    name: "Global Maven Modules",
    filePath: path.join(homeDirectory, ".m2", "repository"),
  },
  {
    name: "VS Code Cache",
    filePath: path.join(homeDirectory, "AppData", "Roaming", "Code", "Cache"),
  },
  {
    name: "VS Code Cached extensions",
    filePath: path.join(
      homeDirectory,
      "AppData",
      "Roaming",
      "Code",
      "CachedData"
    ),
  },
  {
    name: "Android Studio Global Cache",
    filePath: path.join(
      homeDirectory,
      "AppData",
      "Local",
      "Google",
      "AndroidStudio",
      "caches"
    ),
  },
  {
    name: "Android Studio Project Cache",
    filePath: path.join(homeDirectory, ".android", "build-cache"),
  },
];

export const MacFileSystem = [
  {
    name: "Google Chrome browser Cache",
    filePath: path.join(
      homeDirectory,
      "Library",
      "Caches",
      "Google",
      "Chrome",
      "Default",
      "Cache"
    ),
  },
  {
    name: "tmp",
    filePath: path.join(tempDirectory),
  },
  {
    name: "debug",
    filePath: "/var/log",
  },
  {
    name: "Global Node Modules",
    filePath: path.join(homeDirectory, "usr", "local", "lib", "node_modules"),
  },
  {
    name: "Global Maven Modules",
    filePath: path.join(homeDirectory, ".m2", "repository"),
  },
  {
    name: "X-code Cache",
    filePath: path.join(
      homeDirectory,
      "Library",
      "Caches",
      "com.apple.dt.Xcode"
    ),
  },
  {
    name: "VS Code Cache",
    filePath: path.join(
      homeDirectory,
      "Library",
      "Application Support",
      "Code",
      "CachedData"
    ),
  },
  {
    name: "Android Studio Project Cache",
    filePath: path.join(
      homeDirectory,
      "Library",
      "Caches",
      "AndroidStudio",
      "build-cache"
    ),
  },
  {
    name: "Android Studio Global Cache",
    filePath: path.join(
      homeDirectory,
      "Library",
      "Caches",
      "AndroidStudio",
      "caches"
    ),
  },
];

export const LinuxFileSystem = [
  {
    name: "tmp",
    filePath: path.join(tempDirectory),
  },
  {
    name: "debug",
    filePath: "/var/log",
  },
  {
    name: "Global Node Modules",
    filePath: path.join(homeDirectory, "usr", "local", "lib", "node_modules"),
  },
  {
    name: "Global Maven Modules",
    filePath: path.join(homeDirectory, ".m2", "repository"),
  },
  {
    name: "VS Code Cache",
    filePath: path.join(homeDirectory, ".config", "Code", "CachedData"),
  },
  {
    name: "Android Studio Project Cache",
    filePath: path.join(homeDirectory, ".android", "build-cache"),
  },
  {
    name: "Android Studio Global Cache",
    filePath: path.join(homeDirectory, ".config", "AndroidStudio", "caches"),
  },
];
