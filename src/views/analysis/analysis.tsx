import * as React from 'react';

import Tab = require("material-ui/lib/tabs/tab");
import Tabs = require("material-ui/lib/tabs/tabs");
import Table = require("material-ui/lib/table/table");
import TableBody = require("material-ui/lib/table/table-body");
import TableRow = require("material-ui/lib/table/table-row");

export default class Analysis extends React.Component<{}, {}> {
  public render() {
      return (
      <div>
        <Tabs>
          <Tab label="Version History">

          </Tab>
          <Tab label="Tab 2">
            <h1>Tab 2</h1>
          </Tab>
          <Tab label="Tab 3">
            <h1>Tab 3</h1>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
