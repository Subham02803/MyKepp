import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Welcome from "../Components/Welcome";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
  },
});

class LoginPage extends Component {
  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Welcome />
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginPage);
