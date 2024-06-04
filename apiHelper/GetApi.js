import axios from "axios";
import { Api } from "../api/api";

const GetApiData = async (endPoint, message) => {
  try {
    console.log(`${Api.api}/${endPoint}`);
    const response = await axios.get(`${Api.api}/${endPoint}`);
    const Result = await response.data;
    console.log(`Fetching ${message}`);
    if (Result.empty) {
      return "empty";
    }
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data on ${message} `, error);
    return null;
  }
};

export { GetApiData };
