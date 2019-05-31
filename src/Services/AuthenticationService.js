import axios from "axios";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
export const API_URL = "http://localhost:8080";

class AuthenticationService {
  executeJWTAuthenticationServic = (username, password) => {
    return axios.post(`${API_URL}/authenticate`, { username, password });
  };

  createJWTToken = token => {
    return "Bearer " + token;
  };

  setupAxiosInterceptors = tokenHeader => {
    axios.interceptors.request.use(config => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = tokenHeader;
      }
      return config;
    });
  };

  registerSuccessfulLoginForJWT = (username, token) => {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createJWTToken(token));
  };

  logout = () => {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  };

  isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    }

    return true;
  }

  getLoggedInUser = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    if (user === null) {
      return "";
    }

    return user;
  }
}

export default new AuthenticationService();
