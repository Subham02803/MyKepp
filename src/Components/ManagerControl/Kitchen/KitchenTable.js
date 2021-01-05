import React, { Component } from "react";
import { GetDataForKitchenTable } from "../../../servers/Servers";

class KitchenTable extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    tableValues: [],
  };

  componentDidMount = (async) => {
    GetDataForKitchenTable(this.props.category, "").then((res) => {
      this.setState({
        tableValues: res.data.tableData,
      });
    });
  };

  render() {
    return (
      <div>
        <h1>{this.props.category}</h1>
      </div>
    );
  }
}

export default KitchenTable;
