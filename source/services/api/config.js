import axios from "axios";
import Qs from "qs";

const ServerURL = "https://39c3-2400-c600-337c-ff74-e9e3-5d9b-a500-3a2b.ngrok-free.app/api";
// const LiveURL = "https://api.letribe.com";
// const local = "http://192.168.50.198:8000";
// const ngURL = "https://26c6-180-92-147-86.ap.ngrok.io";

const ROOT_URL = ServerURL;

const version = "v1";

const BASE_URL = `${ROOT_URL}`;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const clientWithOutToken = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const clientMultiPart = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

clientMultiPart.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = await localStorage.getItem("userToken");
    if (authToken) {
      authToken = JSON.parse(authToken);
    }
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = await localStorage.getItem("userToken");
    if (authToken) {
      authToken = JSON.parse(authToken);
    }
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

clientWithOutToken.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { ROOT_URL, BASE_URL, client, clientMultiPart, clientWithOutToken };
