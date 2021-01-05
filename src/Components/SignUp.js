import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  Typography,
  withStyles,
  Toolbar,
} from "@material-ui/core";
import { SignUpAxios } from "../servers/Servers";
import { Redirect } from "react-router-dom";
import EmailCheck from "../Algo/SignUpConditons";
import SelectSearch from "react-select-search";

const useStyles = (theme) => ({
  root: {
    padding: "15px",
    maxHeight: "200px",
  },
  field: {
    marginTop: "5px",
  },
  logInButton: {
    marginTop: "80%",
    marginRight: 500,
    width: "20%",
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      firstName: "",
      lastName: "",
      emailId: "",
      emailValidation: true,
      userId: "",
      countryCode: "+91",
      phoneNo: "",
      password: "",
      confirmPassword: "",
      checkedTerms: false,
      signUpbuttonDisabled: true,
      redirect: false,
    };
  }

  loginAccountHandeler = () => {
    this.setState({
      redirect: true,
    });
  };

  firstNameHandleChnage = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        firstName: event.target.value,
      });
    } else {
      this.setState({
        firstName: "",
      });
    }
  };

  lastNameHandleChnage = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        lastName: event.target.value,
      });
    } else {
      this.setState({
        lastName: "",
      });
    }
  };

  emailIdHandleChnage = (event) => {
    if (event.target.value.length > 0) {
      EmailCheck(event.target.value)
        ? this.setState({
            emailValidation: true,
          })
        : this.setState({
            emailValidation: false,
          });

      this.setState({
        emailId: event.target.value,
      });
    } else {
      this.setState({
        emailId: "",
      });
    }
  };

  userIdHandleChnage = (event) => {
    if (event.target.value != null) {
      this.setState({
        userId: event.target.value,
      });
    } else {
      this.setState({
        userId: "",
      });
    }
  };

  phoneNoHandleChnage = (event) => {
    if (event.target.value != null) {
      this.setState({
        phoneNo: event.target.value,
      });
    } else {
      this.setState({
        phoneNo: "",
      });
    }
  };

  passwordHandleChnage = (event) => {
    if (event.target.value != null) {
      this.setState({
        password: event.target.value,
      });
    } else {
      this.setState({
        password: "",
      });
    }
  };

  confirmPasswordHandleChnage = (event) => {
    if (event.target.value != null) {
      this.setState({
        confirmPassword: event.target.value,
      });
    } else {
      this.setState({
        confirmPassword: "",
      });
    }
    if (this.state.password === event.target.value) console.log("yo yo");
  };

  termsHandleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.checked,
      signUpbuttonDisabled: !event.target.checked,
    });
  };

  signUpButtonHandleChange = (async) => {
    SignUpAxios(
      this.state.firstName,
      this.state.lastName,
      this.state.emailId,
      this.state.userId,
      this.state.countryCode,
      this.state.phoneNo,
      this.state.password
    )
      .then((res) => {
        alert(res.data.sucess.isSucess);
      })
      .catch((err) => {
        alert("Server issue");
      });
    this.setState({
      firstName: "",
      lastName: "",
      emailId: "",
      userId: "",
      countryCode: "+91",
      phoneNo: "",
      password: "",
      confirmPassword: "",
      checkedTerms: false,
      redirect: true,
    });
  };

  render() {
    this.state.countryList.map((res) => {
      console.log(res[0]);
      console.log(res[1]);
    });
    const countries = [
      { name: "Swedish", value: "sv" },
      { name: "English", value: "en" },
    ];

    const classes = useStyles();
    return (
      <div>
        <Grid container>
          <Button
            style={{
              backgroundColor: "blue",
              marginTop: "2vh",
              marginLeft: "80vw",
            }}
            onClick={this.loginAccountHandeler}
          >
            Sign In
          </Button>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: "lightgreen",
              marginLeft: "25vw",
              marginTop: "10vh",
              height: "70vh",
            }}
          >
            <Grid container style={{ marginTop: "2vh" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  onChange={(event) => this.firstNameHandleChnage(event)}
                  label="First Name"
                  value={this.state.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  onChange={(event) => this.lastNameHandleChnage(event)}
                  label="Last Name"
                  value={this.state.lastName}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "2vh" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  onChange={(event) => this.emailIdHandleChnage(event)}
                  label="Email ID"
                  value={this.state.emailId}
                />
                {this.state.emailValidation ? null : (
                  <Typography
                    style={{ fontSize: 13, marginRight: "7vw", color: "red" }}
                  >
                    {"*invalid email"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  onChange={(event) => this.userIdHandleChnage(event)}
                  label="User ID"
                  value={this.state.userId}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "2vh" }}>
              <Grid item xs={6}>
                <SelectSearch
                  options={countries}
                  search
                  placeholder="Select your country"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type="number"
                  onChange={(event) => this.phoneNoHandleChnage(event)}
                  label="Phone No"
                  value={this.state.phoneNo}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "2vh" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  type="password"
                  onChange={(event) => this.passwordHandleChnage(event)}
                  label="Password"
                  value={this.state.password}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type="password"
                  onChange={(event) => this.confirmPasswordHandleChnage(event)}
                  label="Confirm Password"
                  value={this.state.confirmPassword}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "4vh" }}>
              <Grid item xs={6}>
                <Checkbox
                  style={{ marginLeft: "17vw" }}
                  checked={this.state.checkedTerms}
                  onChange={this.termsHandleChange("checkedTerms")}
                  value="checkedTerms"
                  color="primary"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ marginTop: "1.5vh", marginRight: "8vw" }}>
                  {"*I agree Terms and conditons"}
                </Typography>
              </Grid>
            </Grid>
            <Button
              style={{
                backgroundColor: "blue",
                width: "30vw",
                marginTop: "3vh",
              }}
              disabled={this.state.signUpbuttonDisabled}
              onClick={this.signUpButtonHandleChange}
            >
              {"Create an account"}
            </Button>
          </Grid>
        </Grid>
        {this.state.redirect === true && (
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

export default SignUp;
