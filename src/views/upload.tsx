import * as React from 'react';
import { Link } from 'react-router';

export default class Upload extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h2>Upload</h2>
        <div onDragEnd={this.onDragLeave}
             onDragLeave={this.onDragLeave}
             onDragOver={this.onDragOver}
             onDrop={this.onDrop}>Drag your file here</div>
      </div>
    );
  }

  private onDragOver() {
    return false;
  }

  private onDragLeave() {
    return false;
  }

  private onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log("File you dragged here is " + file.path);
  }
}
