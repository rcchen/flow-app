import * as React from 'react';
import { Link } from 'react-router';

const electron = require('electron');

export default class Upload extends React.Component<{}, {}> {
  private ipcRenderer = electron.ipcRenderer;

  public render() {
    return (
      <div>
        <h2>Upload</h2>
        <div className="dropzone"
             onDragEnter={this.preventDefault}
             onDragOver={this.preventDefault}
             onDrop={(e) => this.onDrop(e)}>Drag your file here</div>
      </div>
    );
  }

  public componentDidMount() {
    // Respond to response that registers watch
    this.ipcRenderer.on("register-watch-response", (event: Electron.IPCMainEvent, arg: any) => {
      console.log(`Watching ${arg} files`);
    });
  }

  private onDrop(e: React.DragEvent) {
    // Block default drop event
    e.preventDefault();

    // Grab the first "file" which should be a folder
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      throw new Error("Need to only drag a single folder");
    }

    // Get the path of the dropped folder
    const path = files[0].path;

    // Send event to IPC server
    this.ipcRenderer.send("register-watch", path);
  }

  private preventDefault(e: React.DragEvent) {
    e.preventDefault();
  }
}
