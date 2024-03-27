import axios from "axios";

const Api = axios.create({
  // baseURL: "https://support.wptt.ru/api",
  baseURL: "https://спвиурб.рф/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Api;
