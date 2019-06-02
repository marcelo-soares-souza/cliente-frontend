import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";

import AuthenticationService from "../../../Services/AuthenticationService";
import ClienteDataService from "../../../Services/ClienteDataService";
import CEPDataService from "../../../Services/CEPDataService";

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
    telefones: [],
    emails: []
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
        telefones: response.data.telefones,
        emails: response.data.emails
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

  getAddress = values => {
    let cep = values.cep.replace(/[.-]/gi, "");
    if (cep.length === 8) {
      CEPDataService.retrieveAddress(cep).then(response => {
        const data = response.data;
        this.setState({
          ...values,
          cep: cep,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          logradouro: data.logradouro
        });
      });
    }
  };

  onSubmit = values => {
    let username = AuthenticationService.getLoggedInUser();

    let cliente = {
      id: this.state.id,
      nome: values.nome,
      cpf: values.cpf.replace(/[.-]/gi, ""),
      cep: values.cep.replace(/[.-]/gi, ""),
      logradouro: values.logradouro,
      bairro: values.bairro,
      cidade: values.cidade,
      uf: values.uf,
      telefones: values.telefones,
      emails: values.emails
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
      telefones,
      emails
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
              telefones,
              emails
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
                  <Field
                    className="form-control"
                    type="text"
                    name="nome"
                    placeholder="Nome Completo"
                    disabled={!AuthenticationService.isUserAdmin()}
                  />
                </fieldset>
                {/*  */}
                <ErrorMessage
                  name="cpf"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>CPF</label>
                  <Field className="form-control" type="text" name="cpf">
                    {({ field }) => (
                      <MaskedInput
                        mask={[
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ".",
                          /\d/,
                          /\d/,
                          /\d/,
                          ".",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/
                        ]}
                        {...field}
                        placeholder="CPF"
                        className="form-control"
                        disabled={!AuthenticationService.isUserAdmin()}
                      />
                    )}
                  </Field>
                </fieldset>
                {/*  */}
                <ErrorMessage
                  name="cep"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>CEP</label>
                  <Field className="form-control" type="text" name="cep">
                    {({ field }) => (
                      <MaskedInput
                        mask={[
                          /[1-9]/,
                          /\d/,
                          ".",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/
                        ]}
                        {...field}
                        placeholder="CEP"
                        className="form-control"
                        disabled={!AuthenticationService.isUserAdmin()}
                      />
                    )}
                  </Field>

                  {AuthenticationService.isUserAdmin() && (
                    <div
                      className="btn btn-secondary"
                      style={{ margin: "8px 8px" }}
                      onClick={() => this.getAddress(props.values)}
                    >
                      Consultar CEP
                    </div>
                  )}
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
                    disabled={!AuthenticationService.isUserAdmin()}
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
                  <Field
                    className="form-control"
                    type="text"
                    name="bairro"
                    disabled={!AuthenticationService.isUserAdmin()}
                  />
                </fieldset>
                {/*  */}
                <ErrorMessage
                  name="cidade"
                  component="div"
                  className="alert alert-warning"
                  disabled={!AuthenticationService.isUserAdmin()}
                />
                <fieldset className="form-group">
                  <label>Cidade</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="cidade"
                    disabled={!AuthenticationService.isUserAdmin()}
                  />
                </fieldset>
                {/*  */}
                <ErrorMessage
                  name="uf"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>UF</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="uf"
                    disabled={!AuthenticationService.isUserAdmin()}
                  />
                </fieldset>
                {/*  */}
                <ErrorMessage
                  name="telefone"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Telefones</label>
                  <FieldArray
                    name="telefones"
                    render={arrayHelpers => (
                      <div>
                        {props.values.telefones &&
                        props.values.telefones.length > 0
                          ? props.values.telefones.map((telefone, index) => (
                              <div key={index}>
                                <Field
                                  className="form-control"
                                  name={`telefones.${index}`}
                                  style={{ margin: "8px" }}
                                  disabled={
                                    !AuthenticationService.isUserAdmin()
                                  }
                                />
                                {AuthenticationService.isUserAdmin() && (
                                  <div>
                                    <button
                                      className="btn btn-info"
                                      style={{ margin: "8px 8px" }}
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </button>
                                    <button
                                      className="btn btn-info"
                                      style={{ margin: "8px 8px" }}
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, "")
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))
                          : AuthenticationService.isUserAdmin() && (
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Adicionar Novo Telefone
                              </button>
                            )}
                      </div>
                    )}
                  />
                </fieldset>
                {/*  */}
                <fieldset className="form-group">
                  <label>E-Mails</label>
                  <FieldArray
                    name="emails"
                    render={arrayHelpers => (
                      <div>
                        {props.values.emails && props.values.emails.length > 0
                          ? props.values.emails.map((email, index) => (
                              <div key={index}>
                                <Field
                                  className="form-control"
                                  name={`emails.${index}`}
                                  style={{ margin: "8px" }}
                                  disabled={
                                    !AuthenticationService.isUserAdmin()
                                  }
                                />

                                {AuthenticationService.isUserAdmin() && (
                                  <div>
                                    <button
                                      className="btn btn-info"
                                      style={{ margin: "8px 8px" }}
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </button>

                                    <button
                                      className="btn btn-info"
                                      style={{ margin: "8px 8px" }}
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, "")
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))
                          : AuthenticationService.isUserAdmin() && (
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Adicionar Novo E-Mail
                              </button>
                            )}
                      </div>
                    )}
                  />
                </fieldset>{" "}
                {/* Button */}
                {AuthenticationService.isUserAdmin() && (
                  <button className="btn btn-success" type="submit">
                    Salvar
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ClienteComponent;
