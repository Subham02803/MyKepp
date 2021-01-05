import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  Typography,
  withStyles,
} from "@material-ui/core";
import { LogInAxios } from "../servers/Servers";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    padding: "15px",
    maxHeight: "200px",
  },
  field: {
    marginTop: "10px",
  },
});

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userIdRequired: false,
      password: "",
      passwordRequired: false,
      checkedRemember: false,
      isValid: 0,
    };
  }

  userIdHandleChnage = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        userId: event.target.value,
        userIdRequired: false,
      });
    } else {
      this.setState({
        userId: "",
        userIdRequired: true,
      });
    }
  };

  passwordHandleChnage = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        password: event.target.value,
        passwordRequired: false,
      });
    } else {
      this.setState({
        password: "",
        passwordRequired: true,
      });
    }
  };

  rememberHandleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  logInButtonHandleChange = (async) => {
    LogInAxios(this.state.userId, this.state.password)
      .then((res) => {
        this.setState({
          isValid: res.data.status,
        });
      })
      .catch((err) => {
        alert(err);
        console.log("Server Issue");
        this.setState({
          isValid: 0,
        });
      });
  };

  render() {
    const classes = useStyles();

    var buttonMarginTop = "0vw";
    var buttonMarginLeft = "0vw";
    var buttonWidth = "0vw";
    //for computer
    if (window.innerWidth > 800) {
      buttonMarginTop = "4vh";
      buttonMarginLeft = "9vw";
      buttonWidth = "20vw";
    }
    //for mobile
    else {
      buttonMarginTop = "5vh";
      buttonMarginLeft = "15vw";
      buttonWidth = "40vw";
    }
    return (
      <div>
        <Grid container>
          <Grid container>
            <Grid item xs={6}>
              <Typography style={{ marginTop: "10vh", marginLeft: "8vw" }}>
                {"User Id: "}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{
                  marginTop: "9vh",
                  marginRight: "5vw",
                  border: "solid",
                }}
                value={this.state.userId}
                onChange={(event) => {
                  this.userIdHandleChnage(event);
                }}
              />
            </Grid>
          </Grid>
          {this.state.userIdRequired ? (
            <Typography style={{ marginLeft: "18vw", color: "red" }}>
              {"*userId is required"}
            </Typography>
          ) : null}
          <Grid container>
            <Grid item xs={6}>
              <Typography style={{ marginTop: "5vh", marginLeft: "8vw" }}>
                {"Password: "}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{
                  marginTop: "4vh",
                  marginRight: "5vw",
                  border: "solid",
                }}
                type="password"
                value={this.state.password}
                onChange={(event) => {
                  this.passwordHandleChnage(event);
                }}
              />
            </Grid>
          </Grid>
          {this.state.passwordRequired ? (
            <Typography style={{ marginLeft: "18vw", color: "red" }}>
              {"*password is required"}
            </Typography>
          ) : null}
          <Grid container>
            <Grid item xs={6}>
              <Checkbox
                style={{ marginLeft: "12vw" }}
                checked={this.state.checkedRemember}
                onChange={this.rememberHandleChange("checkedRemember")}
                value="checkedRemember"
                color="primary"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginTop: "1.5vh", marginRight: "8vw" }}>
                {"Remember me"}
              </Typography>
            </Grid>
          </Grid>
          <Button
            style={{
              marginTop: buttonMarginTop,
              marginLeft: buttonMarginLeft,
              width: buttonWidth,
              backgroundColor: "blue",
            }}
            onClick={this.logInButtonHandleChange}
          >
            {"Log In"}
          </Button>
        </Grid>
        {this.state.isValid === 2 && (
          <Redirect
            to={{
              pathname: "/managerHome.do",
            }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(LogIn);
