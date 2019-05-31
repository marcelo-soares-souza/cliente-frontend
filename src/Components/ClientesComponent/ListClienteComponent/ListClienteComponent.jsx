import React, { Component } from "react";

import AuthenticationService from "../../../Services/AuthenticationService";
import ClienteDataService from "../../../Services/ClienteDataService";

class ListClienteComponent extends Component {
  state = {
    clientes: [],
    message: null
  };

  refreshAllClientes = () => {
    let username = AuthenticationService.getLoggedInUser();

    ClienteDataService.retrieveAllClientes(username).then(response => {
      this.setState({ clientes: response.data });
    });
  };

  deleteClienteClicked = id => {
    let username = AuthenticationService.getLoggedInUser();

    ClienteDataService.deleteCliente(username, id).then(response => {
      this.setState({ message: `Cliente ${id} Removido` });
      this.refreshAllClientes();
    });
  };

  updateClienteClicked = id => {
    this.props.history.push(`/clientes/${id}`);
  };

  addClienteClicked = () => {
    this.props.history.push(`/clientes/-1`);
  };

  componentDidMount() {
    this.refreshAllClientes();
  }

  render() {
    let clientes = (
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            {!AuthenticationService.isUserAdmin() && <th>Detalhes</th>}
            {AuthenticationService.isUserAdmin() && <th>Editar</th>}
            {AuthenticationService.isUserAdmin() && <th>Apagar</th>}
          </tr>
        </thead>
        <tbody>
          {this.state.clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cidade}</td>
              {!AuthenticationService.isUserAdmin() && (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.updateClienteClicked(cliente.id)}
                  >
                    Detalhes
                  </button>
                </td>
              )}
              {AuthenticationService.isUserAdmin() && (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.updateClienteClicked(cliente.id)}
                  >
                    Editar
                  </button>
                </td>
              )}
              {AuthenticationService.isUserAdmin() && (
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => this.deleteClienteClicked(cliente.id)}
                  >
                    Apagar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div>
        {this.state.message && (
          <div className="alert alert-success"> {this.state.message}</div>
        )}
        <div className="container">
          {this.state.clientes.length > 0 ? (
            clientes
          ) : (
            <h1>Nenhum Cliente Cadastrado</h1>
          )}

          {AuthenticationService.isUserAdmin() && (
            <div className="row">
              <button
                className="btn btn-success"
                onClick={() => this.addClienteClicked()}
              >
                Adicionar Cliente
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ListClienteComponent;
