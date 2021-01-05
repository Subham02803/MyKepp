import React from "react";
import "./App.css";
import Welcome from "./Components/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogInPage from "./views/LogInPage";
import SignupPage from "./views/SignupPage";
import ManagerPage from "./views/ManagerPage";
import FileUpload from "./views/FileUpload";
import SessionHandle from "./views/SessionHandle";

function App() {
  return (
    <div className="App">
      <Router basename={`/`}>
        <Switch>
          <Route exact path="/login.do" component={LogInPage} />
          <Route path="/signup.do" component={SignupPage} />
          <Route path="/managerHome.do" component={ManagerPage} />
          <Route path="/fileUpload.do" component={FileUpload} />
          <Route path="/session.do" component={SessionHandle}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
