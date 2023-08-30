import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
