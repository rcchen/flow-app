import * as chokidar from "chokidar";
import * as electron from "electron";
import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as uuid from "node-uuid";

import { FULL_APP_PATH } from "../";
import { commitFilesToProject, openProject } from "./git";

let ipcMain: Electron.IPCMain;

export function initIPC(app: Electron.App) {
  // Set up communication between renderer process and main process
  ipcMain = electron.ipcMain
  registerFileWatch(app);
  // registerFolderWatch();
}

function registerFileWatch(app: Electron.App) {
  ipcMain.on("register-watch", (event, file) => {
    // Electron handles mapping appData to where files are stored on different OSes
    const fileDataFolder = FULL_APP_PATH + "/" + uuid.v4();
    const fileName = path.basename(file);

    // TODO: Replace with call to server for generating the unique identifier for the repo
    fs.mkdir(fileDataFolder, () => {
      // Copy the file into the fileDataFolder and initialize the Git repo
      fs.createReadStream(file)
        .pipe(fs.createWriteStream(fileDataFolder + "/" + fileName));
      console.log("Stored in " + fileDataFolder);
      openProject(fileDataFolder);
      registerFileActions(event, file, fileDataFolder);
    });
  });
}

function registerFileActions(event: Electron.IPCMainEvent, file: string, fileDataFolder: string) {
  const fileName = path.basename(file);

  let watcher = chokidar.watch(file, {
    persistent: true
  });

  watcher.on("ready", () => {
    event.sender.send("watch-ready", "Ready");
  });

  watcher.on("change", (path: string) => {
    // Copy the file into the fileDataFolder and make a commit
    fs.createReadStream(path)
      .pipe(fs.createWriteStream(fileDataFolder + "/" + fileName));
    commitFilesToProject(fileDataFolder);
    event.sender.send("watch-change", path);
  });
}

function registerFolderWatch() {
  // Responsible for getting directory structure
  ipcMain.on("register-watch", (event, folder) => {
    console.log(folder);

    let watcher = chokidar.watch(folder + "/", {
      ignored: /[\/\\]\.|node_modules/,
      persistent: true
    });

    watcher.on("ready", () => {
      console.log("readyyyy");
      console.log(watcher.getWatched());
    });

    watcher.on("all", (event: Event, path: string) => {
      console.log(event, path);
    });

    watcher.on("add", (path: string) => {
      event.sender.send("watch-add", path);
    });

    watcher.on("change", (path: string) => {
      event.sender.send("watch-change", path);
    });

    watcher.on("unlink", (path: string) => {
      event.sender.send("watch-unlink", path);
    });

    glob(folder + "**/*", {}, (err, files) => {
      event.sender.send("register-watch-response", files.length);
    });
  });
}
