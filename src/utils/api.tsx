import axios from "axios";

import { ApiConstants } from "@/types";

export default axios.create({
  baseURL: `${ApiConstants.API_BASE_URL}`,
});
