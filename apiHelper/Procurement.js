import axios from "axios";
import { Api } from "../api/api";

const NewProcurementApi = async (id, values) => {
  try {
    const Response = await fetch(`${Api.api}/procurement/store/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const ResponseData = await Response.json();
    // console.log("Res", ResponseData);
    return "success";
  } catch (error) {
    console.log(error);
  }
};

const GetCartProcurementApi = async (id, district) => {
  try {
    const apiUrl = `${Api.api}/procurement/grouped-procure/${id}/${district}`;

    axios.get(apiUrl).then((response) => {
      return response.data.docs;
    });
  } catch (error) {
    console.error("Error fetching get cart procurement api:", error);
  }
};

// working this is properly ]
const GetLotNo = async (id) => {
  try {
    const Response = await axios.get(`${Api.api}/procurement/lot-no/${id}`);
    const response = await Response.data;
    return response.doc.lotNo;
  } catch (error) {
    console.error("Error fetching get lot no:", error);
    return null;
  }
};

const FetchDistrictData = async () => {
  try {
    const response = await axios.get(`${Api.api}/districts/lists`);
    const Result = await response.data;
    console.log("fetching district from procurement");
    return Result.docs;
  } catch (error) {
    console.error("Error fetching district data:", error);
    return null;
  }
};

const FetchCompetitorsData = async (district) => {
  try {
       console.log(district)
    const response = await fetch(`${Api.api}/competitor/index/${district}`);
    if (!response.ok) {
      if (response.status === 500) {
        console.log(
          "Server responded with status code 500, but it is expected behavior."
        );
        return null;
      }
      throw new Error("Failed to fetch data");
    }
    const jsonData = await response.json();
    
    if(jsonData.success){
    return jsonData.docs
    }else{
      return null
    }
  } catch (error) {
    console.error("Error on fetch competitors data:", error.message);
    throw error;
  }
};

const FetchProductsData = async () => {
  try {
    const response = await axios.get(`${Api.api}/product/index`);
    const Result = await response.data;
    console.log("fetching competitors from competiters report");
    return Result.docs;
  } catch (error) {
    console.error("Error fetching  products data:", error);
  }
};

const SendProductsData = async (value) => {
  try {
    const Response = await axios.post(`${Api.api}/product/store`, {
      name: value,
    });
    const ResponseData = await Response.data();
    console.log(Response);
    if (Response.data.success) {
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
};

const SendCompetitorsData = async (value) => {
  try {
    const Response = await axios.post(`${Api.api}/product/store`, {
      name: value,
    });
    const ResponseData = await Response.data();
    console.log(Response);
    if (Response.data.success) {
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
};

const SendForPricing = async (id, district) => {
  try {
    const response = await axios.get(
      `${Api.api}/price/send-for-pricing/${id}/${district}`
    );
    const Result = await response.data;
    console.log("Hitting Api From Send For Pricing");
    console.log(Result.doc);
    return Result.doc;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const EditProcurementApi = async (id, pId, values) => {
  try {
    const Response = await fetch(`${Api.api}/procurement/update/${id}/${pId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const ResponseData = await Response.json();
    console.log("Res", ResponseData);
    return "success";
  } catch (error) {
    console.log(error);
  }
};

const SendCompetitorsReport = async (id, values) => {
  try {
    const Response = await fetch(`${Api.api}/competitor-report/store/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const ResponseData = await Response.json();
    console.log("Response from competitor report", ResponseData);
    return "success";
  } catch (error) {
    console.log(error);
  }
};

const MyProcrements = async (id) => {
  try {
    const response = await axios.get(`${Api.api}/procurement/my-procure/${id}`);
    const Result = await response.data;
    console.log("Fetching Myprocurement in Procurement routes");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Error Fetching Myprocurement Datas in Procurement routes:",
      error
    );
    return null;
  }
};

const GetCompetitorsDistrict = async () => {
  try {
    const response = await axios.get(
      `${Api.api}/competitor/district-competitor`
    );
    const Result = await response.data;
    console.log("Fetching Competitors Report from procurement route");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Error Fetching Competitors Report from procurement route:",
      error
    );
    return null;
  }
};

const GetProcurementHistory = async (id) => {
  try {
    const response = await axios.get(
      `${Api.api}/procurement/procurement-history/${id}`
    );
    const Result = await response.data;
    console.log("Fetching History from procurement route");
    if (Result.success) {
      console.log(Result.docs);
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error Fetching History from procurement route", error);
    return null;
  }
};


const FetchEditProcurement = async(id)=>{
  try {
    const response = await axios.get(
      `${Api.api}/procurement/all-district-procurement/${id}`
    );
    const Result = await response.data;
    console.log("Fetching Edit Procurement");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Error Fetching Edit Prociurement route:",
      error
    );
    return null;
  }
}

export {
  NewProcurementApi,
  GetCartProcurementApi,
  GetLotNo,
  FetchDistrictData,
  FetchCompetitorsData,
  FetchProductsData,
  SendProductsData,
  SendCompetitorsData,
  SendForPricing,
  EditProcurementApi,
  SendCompetitorsReport,
  MyProcrements,
  GetCompetitorsDistrict,
  GetProcurementHistory,
  FetchEditProcurement
};
