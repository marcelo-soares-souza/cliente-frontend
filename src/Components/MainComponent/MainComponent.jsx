import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HeaderComponent from "../Layout/HeaderComponent";
import FooterComponent from "../Layout/FooterComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

class MainComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <>
            <HeaderComponent />
            <Switch>
                <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainComponent;
