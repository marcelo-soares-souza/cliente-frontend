import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HeaderComponent from "../Layout/HeaderComponent";
import LoginComponent from "../LoginComponent/LoginComponent";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import ClienteComponent from "../ClientesComponent/ClienteComponent/ClienteComponent";
import ListClienteComponent from "../ClientesComponent/ListClienteComponent/ListClienteComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import AuthenticatedRoute from "../../Helper/AuthenticatedRoute";

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
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <AuthenticatedRoute path="/clientes/:id" component={ClienteComponent} />
              <AuthenticatedRoute path="/clientes" component={ListClienteComponent} />

              <Route component={ErrorComponent} />
            </Switch>
            
          </React.Fragment>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainComponent;
