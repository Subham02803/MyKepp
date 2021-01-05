import React, { Component } from "react";
import {
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  TextField,
} from "@material-ui/core";
import {
  GetKitchenCategories,
  ChangeKitchenCategories,
} from "../../../servers/Servers";
import Popup from "reactjs-popup";
import KitchenTable from "./KitchenTable";

class KitchenMain extends Component {
  state = {
    categories: [],
    checked: [],
    updateCategoryValues: [],
    addCategoryValue: "",
    updateCategoryValue: "",
    isDisable: true,
  };

  componentDidMount = (async) => {
    GetKitchenCategories().then((res) => {
      this.setState({ categories: res.data.foodCategoryList });
    });
  };

  handleToggle = (value, category) => () => {
    const { checked, updateCategoryValues } = this.state;
    const currentIndex = checked.indexOf(value);
    const curCategory = updateCategoryValues.indexOf(category);
    const newChecked = [...checked];
    const newupdateCategoryValues = [...updateCategoryValues];
    if (currentIndex === -1) {
      newChecked.push(value);
      newupdateCategoryValues.push(category);
    } else {
      newChecked.splice(currentIndex, 1);
      newupdateCategoryValues.splice(curCategory, 1);
    }

    if (newChecked.length === 1) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }

    this.setState({
      checked: newChecked,
      updateCategoryValues: newupdateCategoryValues,
      updateCategoryValue: newupdateCategoryValues[0],
    });
  };

  handleChangeAddCategoryValue = (event) => {
    this.setState({ addCategoryValue: event.target.value });
  };

  handleChangeUpdateCategoryValue = (event) => {
    this.setState({ updateCategoryValue: event.target.value });
  };

  handleAddChangeCategory = (async) => {
    ChangeKitchenCategories(-1, this.state.addCategoryValue, 0)
      .then((res) => {
        if (res.data.status === 1) {
          alert("Added");
        } else {
          alert("Failed");
        }
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  handleUpdateChangeCategory = (async) => {
    var pkId = this.state.checked[0];
    ChangeKitchenCategories(pkId, this.state.updateCategoryValue, 0)
      .then((res) => {
        if (res.data.status === 1) {
          alert("Updated");
        } else {
          alert("Failed");
        }
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  handleDeleteCategory = (async) => {
    var pkId = this.state.checked[0];
    ChangeKitchenCategories(pkId, "", 1)
      .then((res) => {
        if (res.data.status === 1) {
          alert("Deleted");
        } else {
          alert("Failed");
        }
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  render() {
    const { classes } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <Grid container>
          <Grid xs={3}>
            <Typography>Categories</Typography>
            <Grid>
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    Add
                  </Button>
                }
                position="bottom left"
              >
                {(close) => (
                  <div style={{ margin: "20px" }}>
                    <TextField
                      label="Category Name"
                      onChange={this.handleChangeAddCategoryValue}
                    />
                    <Button
                      onClick={(async) => {
                        this.handleAddChangeCategory();
                        close();
                      }}
                      style={{ backgroundColor: "#31cfeb" }}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </Popup>
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.isDisable}
                  >
                    Edit
                  </Button>
                }
                position="bottom left"
              >
                {(close) => (
                  <div style={{ margin: "20px" }}>
                    <TextField
                      label="Category Name"
                      value={this.state.updateCategoryValue}
                      onChange={this.handleChangeUpdateCategoryValue}
                    />
                    <Button
                      onClick={(async) => {
                        this.handleUpdateChangeCategory();
                        close();
                      }}
                      style={{ backgroundColor: "#31cfeb" }}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </Popup>

              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
                disabled={this.state.isDisable}
                onClick={this.handleDeleteCategory}
              >
                Delete
              </Button>
            </Grid>
            <Grid>
              <List
                dense
                style={{
                  width: "100%",
                  height: 450,
                  maxHeight: 450,
                  backgroundColor: "white",
                  overflow: "auto",
                }}
              >
                {categories.map((value) => (
                  <ListItem key={value} button>
                    <ListItemText primary={value.categoryDisplay} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        onChange={this.handleToggle(
                          value.pkFoodCategoryId,
                          value.categoryValue
                        )}
                        checked={
                          this.state.checked.indexOf(value.pkFoodCategoryId) !==
                          -1
                        }
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid xs={9}>
            <KitchenTable category={this.state.updateCategoryValue} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default KitchenMain;
