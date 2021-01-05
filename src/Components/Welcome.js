import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Link, Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  paper: {
    minHeight: "500%",
    width: "70%",
    backgroundColor: "transparent",
    marginTop: "2%",
  },
  logInButton: {
    marginTop: "80%",
    marginRight: 500,
    width: "20%",
  },
  signUpButton: {
    marginTop: "80%",
    marginRight: 130,
  },
});

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonVlaue: "login",
      redirect: false,
    };
  }
  logInButtonHander = () => {
    this.setState({
      buttonVlaue: "login",
    });
  };
  sigUpButtonHander = () => {
    this.setState({
      buttonVlaue: "signup",
    });
  };

  createAccountHandeler = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const classes = useStyles();
    var gridHeight = "0vh";
    var gridWidth = "0vw";
    var gridMargin = "0vw";
    //for computer
    if (window.innerWidth > 800) {
      gridWidth = "70vw";
      gridMargin = "30vw";
    }
    //for mobile
    else {
      gridWidth = "140vw";
      gridMargin = "14vw";
    }
    return (
      <div>
        <Grid
          container
          style={{
            marginTop: "15vh",
            marginLeft: gridMargin,
            height: "50vh",
            width: gridWidth,
          }}
        >
          <Grid item xs={6} style={{ backgroundColor: "#C4CCD5" }}>
            <LogIn />
            <Grid container style={{ marginTop: "3vh" }}>
              <Grid item xs={6}>
                <Typography>Don't have account?</Typography>
              </Grid>
              <Grid item xs={6}>
                <Link onClick={this.createAccountHandeler}>
                  <Typography>Create an account</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.redirect === true && (
          <Redirect
            to={{
              pathname: "/signup.do",
            }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Welcome);
