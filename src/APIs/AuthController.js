import APIURLs from "./APIUrls";
import ApiClient from "./APIClient";

export default class AuthController {
  constructor() {
    this.apiClient = new ApiClient(APIURLs.baseURL);
  }

  async register(user) {
    return this.apiClient
      .post(APIURLs.register, user)
      .then((response) => {
        if (response.code === 300) {
          alert(response.message);
          return false;
        }

        if (response.code === 200) {
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async login(user) {
    return this.apiClient
      .post(APIURLs.login, user)
      .then((response) => {
        if (response.code === 300) {
          alert(response.message);
          return false;
        }

        if (response.code === 200) {
          console.log("Logged In");
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
