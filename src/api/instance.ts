import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
  },
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.error(err);
    alert("요청에 실패하였습니다.");
  },
);

export default instance;
