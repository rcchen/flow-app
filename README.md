# flow-app

This project provides a base for React-based client side applications written
in Typescript. Dependencies are bundled with Webpack.

## Requirements

```
npm install -g gulp typescript
```

## Setup

```
npm install
gulp
```

## Provided dependencies/typings

* React (0.14.7)
* ReactDOM (0.14.7)
* react-router (2.0.0-rc4)

## Task List

* Application
  * List out projects that are tracked (using Material tables)
  * Drag a file to the projects list to initialize the new project
  * Show list of revisions for a given project
* Electron
  * Determine and create user settings configuration format
  * Standardize IPC passing format
  * Modularize code
  * Fix commit timestamps, give a reasonable message
