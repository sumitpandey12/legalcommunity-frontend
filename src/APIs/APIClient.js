export default class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, method = "GET", body = null, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, requestOptions);
      return response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }
  async requestForm(endpoint, method = "POST", body = null, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = {
      method,
      headers: {
        ...headers,
      },
    };

    if (body) {
      requestOptions.body = body;
    }
    try {
      const response = await fetch(url, requestOptions);
      return response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, "POST", body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, "PUT", body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }

  handleResponse(response) {
    return response.then((text) => {
      const data = JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
}
