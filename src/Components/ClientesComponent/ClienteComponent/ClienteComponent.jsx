import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthenticationService from "../../../Services/AuthenticationService";
import ClienteDataService from "../../../Services/ClienteDataService";

class ClienteComponent extends Component {
  state = {
    id: this.props.match.params.id,
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    telefone: "",
    email: ""
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
        nome: response.data.nome,
        cpf: response.data.cpf,
        cep: response.data.cep,
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.cidade,
        uf: response.data.uf,
        telefone: response.data.telefone,
        email: response.data.email
      });
    });
  }

  validate = values => {
    let errors = {};

    if (!values.nome) {
      errors.nome = "Entre um Nome";
    } else if (values.nome.length < 3) {
      errors.nome = "No Mínimo 3 Caracteres";
    } else if (values.nome.length > 100) {
      errors.nome = "No Máximo 100 Caracteres";
    }

    if (!values.cpf) {
      errors.cpf = "Entre um CPF";
    }

    if (!values.cep) {
      errors.cep = "Entre um CEP";
    }

    if (!values.logradouro) {
      errors.logradouro = "Entre um Logradouro";
    }

    if (!values.bairro) {
      errors.bairro = "Entre um Bairro";
    }

    if (!values.cidade) {
      errors.cidade = "Entre uma Cidade";
    }

    if (!values.uf) {
      errors.uf = "Entre uma UF";
    }
    
    
    return errors;
  };

  onSubmit = values => {
    let username = AuthenticationService.getLoggedInUser();

    let cliente = {
      id: this.state.id,
      nome: values.nome,
      cpf: values.cpf,
      cep: values.cep,
      logradouro: values.logradouro,
      bairro: values.bairro,
      cidade: values.cidade,
      uf: values.uf,
      telefone: values.telefone,
      email: values.email
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
    let {
      nome,
      cpf,
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      telefone,
      email
    } = this.state;

    return (
      <div>
        <h1>Cliente</h1>
        <div className="container">
          <Formik
            initialValues={{
              nome,
              cpf,
              cep,
              logradouro,
              bairro,
              cidade,
              uf,
              telefone,
              email
            }}
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

                {/*  */}

                <ErrorMessage
                  name="cpf"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>CPF</label>
                  <Field className="form-control" type="text" name="cpf" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="cep"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>CEP</label>
                  <Field className="form-control" type="text" name="cep" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="logradouro"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Logradouro</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="logradouro"
                  />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="bairro"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Bairro</label>
                  <Field className="form-control" type="text" name="bairro" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="cidade"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Cidade</label>
                  <Field className="form-control" type="text" name="cidade" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="uf"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>UF</label>
                  <Field className="form-control" type="text" name="uf" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="telefone"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Telefone</label>
                  <Field className="form-control" type="text" name="telefone" />
                </fieldset>

                {/*  */}

                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>E-Mail</label>
                  <Field className="form-control" type="text" name="email" />
                </fieldset>

                {/* Button */}

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
