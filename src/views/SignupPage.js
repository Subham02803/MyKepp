import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import SignUp from "../Components/SignUp";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <SignUp />
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignUpPage);
