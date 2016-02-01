import * as React from "react";

import AppBar = require("material-ui/lib/app-bar");
import LeftNav = require("material-ui/lib/left-nav");
import Menu = require( "material-ui/lib/menus/menu");
import MenuItem = require("material-ui/lib/menus/menu-item");

import { browserHistory, Link } from 'react-router';

import { BASE_PATH } from './router';

interface IAppProps {
  children: Object;
}

interface IAppState {
  leftNavOpen: boolean;
}

export class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    leftNavOpen: false
  };

  public render() {
    return (
      <div>
        <AppBar title="Title" onLeftIconButtonTouchTap={() => this.toggleLeftNav()} />
        <LeftNav open={this.state.leftNavOpen}>
          <MenuItem onTouchTap={(e) => this.selectMenuItem(e)}>About</MenuItem>
          <MenuItem onTouchTap={(e) => this.selectMenuItem(e)}>Upload</MenuItem>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }

  private selectMenuItem(e: __MaterialUI.TouchTapEvent) {
    const menuItem = e.target;
    switch (e.target.innerText) {
      case "About":
        browserHistory.push(`${BASE_PATH}/about`);
        break;
      case "Upload":
        browserHistory.push(`${BASE_PATH}/upload`);
        break;
    }
    this.toggleLeftNav();
  }

  private toggleLeftNav() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    });
  }
}
