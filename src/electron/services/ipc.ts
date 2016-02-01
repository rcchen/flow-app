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
  ipcMain.on("register-watch", (event, arg) => {
    glob(arg + "**/*", {}, (err, files) => {
      event.sender.send("register-watch-response", files);
    });
  });
}
