import axios from "axios";

export const API_URL = "http://localhost:8080";

class ClienteDataService {
  retrieveAllClientes = name => {
    return axios.get(`${API_URL}/users/${name}/clientes`);
  };

  deleteCliente = (name, id) => {
    return axios.delete(`${API_URL}/users/${name}/clientes/${id}`);
  };

  retrieveCliente = (name, id) => {
    return axios.get(`${API_URL}/users/${name}/clientes/${id}`);
  };

  updateCliente = (name, id, cliente) => {
    return axios.put(`${API_URL}/users/${name}/clientes/${id}`, cliente);
  };

  createCliente = (name, cliente) => {
    console.log(cliente);
    return axios.post(`${API_URL}/users/${name}/clientes`, cliente);
  };
}

export default new ClienteDataService();
