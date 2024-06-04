import axios from "axios";
import { Api } from "../api/api";

export const PostProfileInfo = async (id, values) => {
  try {
    const Response = await axios.patch(
      `${Api.api}/manager/profile-info/${id}`,
      values
    );
    const ResponseData = await Response.data;
    AsyncStorage.setItem("userInfo", JSON.stringify(ResponseData.doc));
    return "success";
  } catch (error) {
    console.log(`Error on Sending ProfileInformation`, error);
  }
};

// export const LoginApi = async()=>{

// }
