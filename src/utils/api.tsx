import axios from "axios";

import { ApiConstants } from "@/types";

export default axios.create({
  baseURL: "https://support.wptt.ru/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
