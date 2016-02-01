import * as electron from "electron";

let ipcRenderer: Electron.IpcRenderer;

export function initIPC() {
  // Set up communication between renderer process and main process
  ipcRenderer = electron.ipcRenderer;
  registerWatch();
}

function registerWatch() {
  ipcRenderer.on("watch-add", (event: Electron.IPCMainEvent, arg: any) => {
    console.log("added: " + arg);
  });

  ipcRenderer.on("watch-change", (event: Electron.IPCMainEvent, arg: any) => {
    console.log("changed: " + arg);
  });

  ipcRenderer.on("watch-unlink", (event: Electron.IPCMainEvent, arg: any) => {
    console.log("deleted:" + arg);
  });
}
