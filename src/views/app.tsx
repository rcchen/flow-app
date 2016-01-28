import * as React from "react";

import AppBar = require("material-ui/lib/app-bar");
import LeftNav = require("material-ui/lib/left-nav");
import Menu = require( "material-ui/lib/menus/menu");
import MenuItem = require("material-ui/lib/menus/menu-item");

import { Link } from 'react-router';

interface IAppProps {
  children: Object;
}

interface IAppState {
  leftNavOpen: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    leftNavOpen: false
  };

  public render() {
    return (
      <div>
        <AppBar title="Title" onLeftIconButtonTouchTap={() => this.toggleLeftNav()} />
        <LeftNav open={this.state.leftNavOpen}>
          <MenuItem onTouchTap={(e) => this.selectMenuItem(e)}>Home</MenuItem>
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
      case "Home":
        console.log("home");
        break;
      case "About":
        console.log("about");
        break;
      case "Upload":
        console.log("upload");
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
