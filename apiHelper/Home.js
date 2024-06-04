import axios from "axios";
import { Api } from "../api/api";

const GetBidsData = async (id, endPoint, message) => {
  try {
    const response = await axios.get(`${Api.api}/${endPoint}/${id}`);
    const Result = await response.data;
    console.log(`Fetching ${message} in Home route`);
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data on ${message} in home route`, error);
    return null;
  }
};

export { GetBidsData };
