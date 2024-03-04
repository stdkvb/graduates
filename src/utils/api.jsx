import axios from "axios";

const Api = axios.create({
  baseURL: "https://support.wptt.ru/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Api;
