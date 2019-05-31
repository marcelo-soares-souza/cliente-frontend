import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthenticationService from "../../../Services/AuthenticationService";
import ClienteDataService from "../../../Services/ClienteDataService";

class ClienteComponent extends Component {
  state = {
    id: this.props.match.params.id,
    nome: ""
  };

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }

    let username = AuthenticationService.getLoggedInUser();

    ClienteDataService.retrieveCliente(
      username,
      this.props.match.params.id
    ).then(response => {
      this.setState({
        nome: response.data.nome
      });
    });
  }

  validate = values => {
    let errors = {};

    if (!values.nome) {
      errors.nome = "Entre um Nome";
    } else if (values.nome.length < 5) {
      errors.nome = "De pelo menos 3 caracteres";
    }

    return errors;
  };

  onSubmit = values => {
    let username = AuthenticationService.getLoggedInUser();

    let cliente = {
      id: this.state.id,
      nome: values.nome
    };

    if (this.state.id === -1) {
      ClienteDataService.createCliente(username, cliente).then(() => {
        this.props.history.push("/clientes");
      });
    } else {
      ClienteDataService.updateCliente(username, this.state.id, cliente).then(
        () => {
          this.props.history.push("/clientes");
        }
      );
    }
  };

  render() {
    let { nome } = this.state;

    return (
      <div>
        <h1>Cliente</h1>
        <div className="container">
          <Formik
            initialValues={{ nome }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Nome</label>
                  <Field className="form-control" type="text" name="nome" />
                </fieldset>

                <button className="btn btn-success" type="submit">
                  Salvar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ClienteComponent;