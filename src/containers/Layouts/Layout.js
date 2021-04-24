import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked = {this.sideDrawerToggle}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClose}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
