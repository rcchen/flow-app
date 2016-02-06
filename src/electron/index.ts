// This file is adapted from the Electron quick-start
// http://electron.atom.io/docs/latest/tutorial/quick-start/

"use strict";

import * as electron from "electron";
import * as fs from "fs";

import { initIPC } from "./services/ipc";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const APP_DIMENSIONS = {
  height: 600,
  width: 800
};

const APP_NAME = "flowai";
export const FULL_APP_PATH = app.getPath("appData") + "/" + APP_NAME;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow: Electron.BrowserWindow = null;

// Quit when all windows are closed.
app.on("window-all-closed", () => {

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != "darwin") {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", () => {

  // Ensure that the application folder is created correctly
  registerApplicationFolder();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: APP_DIMENSIONS.width,
    height: APP_DIMENSIONS.height
  });

  // and load the index.html of the app.
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on("will-navigate", (e: Event) => {
    e.preventDefault();
  });

  // Initialize all IPC channels
  initIPC(app);
});

function registerApplicationFolder() {
  fs.access(FULL_APP_PATH, fs.W_OK, (err) => {
    if (err && err.code === "ENOENT") { // folder does not exist
      fs.mkdirSync(FULL_APP_PATH);
    }
  });
}
