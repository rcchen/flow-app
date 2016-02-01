import * as chokidar from "chokidar";
import * as electron from "electron";
import * as glob from "glob";

let ipcMain: Electron.IPCMain;

export function initIPC() {
  // Set up communication between renderer process and main process
  ipcMain = electron.ipcMain
  registerWatch();
}

function registerWatch() {
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
