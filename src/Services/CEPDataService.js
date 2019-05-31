import axios from "axios";

class CEPDataService {
  retrieveAddress = cep => {
    const instance = axios.create();
    return instance.get(`https://viacep.com.br/ws/${cep}/json/`);
  };
}

export default new CEPDataService();
