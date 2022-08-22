import axios from "axios";
import { Host, ApiEndpoints } from "../common/apiEndPoints";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const StartApi = async (data) => {
  return await axios.post(
    `${Host.BACKEND}${ApiEndpoints.IdsEndpoints.route}${ApiEndpoints.IdsEndpoints.start}`,
    data,
    { headers: { ...config.headers } }
  );
};

const StopApi = async () => {
  return await axios.get(
    `${Host.BACKEND}${ApiEndpoints.IdsEndpoints.route}${ApiEndpoints.IdsEndpoints.stop}`,
    { headers: { ...config.headers } }
  );
};



export {
  StartApi , StopApi
};