import React, { Component } from "react";
import AuthenticationService from "../../Services/AuthenticationService";

class LoginComponent extends Component {
  state = {
    username: "",
    password: "",
    hasLoginFailed: false,
    showSuccessMessage: false
  };

  loginClicked = () => {
    console.log('teste');
    AuthenticationService.executeJWTAuthenticationServic(
      this.state.username,
      this.state.password
    )
      .then(response => {
        AuthenticationService.registerSuccessfulLoginForJWT(
          this.state.username, response.data.token
        );
        this.props.history.push(`/clientes`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <br/>
        <div className="container">
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Usuário ou Senha Inválidos</div>
          )}
          {this.state.showSuccessMessage && <div>Bem Vindo</div>}
          <fieldset className="form-group">
          <label>Usuário:</label>
          <input
             className="form-control"
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          </fieldset>

          <fieldset className="form-group">
          <label>Senha:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          </fieldset>
          <button className="btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
