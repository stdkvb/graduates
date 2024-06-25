import axios from "axios";

const Api = axios.create({
  baseURL: "https://support.wptt.ru/api",
  // baseURL: "https://xn--90abs0ahcr.xn--p1ai/api",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

export default Api;
