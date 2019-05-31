import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HeaderComponent from "../Layout/HeaderComponent";
import FooterComponent from "../Layout/FooterComponent";
import LoginComponent from "../LoginComponent/LoginComponent";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

class MainComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <React.Fragment>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/logout" component={LogoutComponent} />

              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </React.Fragment>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainComponent;
