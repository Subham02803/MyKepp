import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";
import KitchenIcon from "@material-ui/icons/Kitchen";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MenuItem, Menu } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Redirect } from "react-router-dom";
import OrdersMain from "./Orders/OrdersMain";
import KitchenMain from "./Kitchen/KitchenMain";
import AnalysisMain from "./Analysis/AnalysisMain";
import CashMain from "./Cash/CashMain";
import UserListMain from "./UserList/UserListMain";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 0",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ManagerControl extends React.Component {
  state = {
    open: false,
    notificationAnchorEl: null,
    accountAnchorEl: null,
    isLogOut: false,
    mainMenuControl: "Orders",
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleNotificationMenuOpen = (event) => {
    this.setState({ notificationAnchorEl: event.currentTarget });
  };
  handleNotificationMenuClose = () => {
    this.setState({ notificationAnchorEl: null });
  };

  handleAccountMenuOpen = (event) => {
    this.setState({ accountAnchorEl: event.currentTarget });
  };
  handleAccountMenuClose = () => {
    this.setState({ accountAnchorEl: null });
  };

  handleLogOut = () => {
    this.setState({ isLogOut: true });
  };

  handleMainMenuControl = (value) => {
    this.setState({ mainMenuControl: value });
  };

  render() {
    const { classes, theme } = this.props;
    const {
      accountAnchorEl,
      notificationAnchorEl,
      mainMenuControl,
    } = this.state;
    const isAccountMenuOpen = Boolean(accountAnchorEl);
    const isNotificationMenuOpen = Boolean(notificationAnchorEl);

    const AccountMenu = (
      <Menu
        anchorEl={accountAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isAccountMenuOpen}
        onClose={this.handleAccountMenuClose}
      >
        <MenuItem onClick={this.handleAccountMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleAccountMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
      </Menu>
    );

    const NotificationMenu = (
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationMenuOpen}
        onClose={this.handleNotificationMenuClose}
      >
        <MenuItem>Notificatios</MenuItem>
      </Menu>
    );

    let control;

    if (mainMenuControl === "Orders") control = <OrdersMain />;
    else if (mainMenuControl === "Kitchen") control = <KitchenMain />;
    else if (mainMenuControl === "UserList") control = <UserListMain />;
    else if (mainMenuControl === "Cash") control = <CashMain />;
    else if (mainMenuControl === "Analysis") control = <AnalysisMain />;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Manager Control
            </Typography>
            <MenuItem
              onClick={this.handleNotificationMenuOpen}
              style={{ marginLeft: "50vw" }}
            >
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </MenuItem>
            <MenuItem onClick={this.handleAccountMenuOpen}>
              <IconButton color="inherit">
                <Typography>Subham Biswas</Typography>
                <AccountCircleIcon />
              </IconButton>
            </MenuItem>
          </Toolbar>
        </AppBar>
        {AccountMenu}
        {NotificationMenu}
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Divider />
          <List>
            <ListItem
              button
              key={"Orders"}
              onClick={() => this.handleMainMenuControl("Orders")}
            >
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
            <ListItem
              button
              key={"Kitchen"}
              onClick={() => this.handleMainMenuControl("Kitchen")}
            >
              <ListItemIcon>
                <KitchenIcon />
              </ListItemIcon>
              <ListItemText primary={"Kitchen"} />
            </ListItem>
            <ListItem
              button
              key={"UserList"}
              onClick={() => this.handleMainMenuControl("UserList")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"User List"} />
            </ListItem>
            <ListItem
              button
              key={"Cash"}
              onClick={() => this.handleMainMenuControl("Cash")}
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary={"Cash"} />
            </ListItem>
            <ListItem
              button
              key={"Analysis"}
              onClick={() => this.handleMainMenuControl("Analysis")}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Analysis"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {control}
        </main>
        {this.state.isLogOut === true && (
          <Redirect
            to={{
              pathname: "/login.do",
            }}
          />
        )}
      </div>
    );
  }
}

ManagerControl.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ManagerControl);
