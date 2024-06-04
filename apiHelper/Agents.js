import axios from "axios";
import { Api } from "../api/api";

const GetOpenBids = async (id) => {
  try {
    // const response = await axios.get(`${Api.api}/procurement/open-bids/${id}`);
    const response = await axios.get(
      `${Api.api}/procurement/check-open-bids/${id}`
    );
    const Result = await response.data;

    console.log("Fetching openBids details in agent routes");
    return Result.docs;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const SendProcurementPrice = async (id, values) => {
  try {
    const Response = await fetch(`${Api.api}/price/store/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const ResponseData = await Response.json();
    return ResponseData.status;
  } catch (error) {
    console.log(error);
  }
};

const GetAgnetDetails = async () => {
  try {
    const response = await axios.get(`${Api.api}/agent/district-agents`);
    const Result = await response.data;
    console.log("Fetching agents datas district vice from agent routes");
    return Result.docs;
  } catch (error) {
    console.error("Error fetching agents details data:", error);
  }
};

const GetAgnetsListDistrictVice = async (district) => {
  try {
    const response = await axios.get(`${Api.api}/agent/agent/${district}`);
    const Result = await response.data;
    console.log("Fetching agents list district vice from agent routes");

    return Result.docs;
  } catch (error) {
    console.error("Error fetching agent list data:", error);
  }
};

const GetAgentsOpenBids = async (id) => {
  try {
    const response = await axios.get(`${Api.api}/agent/agent-open-bids/${id}`);
    const Result = await response.data;
    console.log("Fetching Particular Agent OpenBids Data");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching openBids data:", error);
    return null;
  }
};
const GetAgentsBids = async (id) => {
  try {
    const response = await axios.get(`${Api.api}/agent/agent-bids/${id}`);
    const Result = await response.data;
    console.log("Fetching Particular Agent Bids Data");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data Agent Bids Data:", error);
    return null;
  }
};

const GetAgentsCompetitrosReport = async (district, agentId) => {
  try {
    // const response = await axios.get(`${Api.api}/competitor/index/${district}`);
    console.log(district);
    console.log(agentId);
    const response = await axios.get(
      `${Api.api}/competitor/index/${district}?agentId=${agentId}`
    );
    const Result = await response.data;
    console.log("Fetching Particular Agent Competitors Report");
    if (Result.success) {
      console.log("c", Result.docs);
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Agent competitor Reports data:", error);
    return null;
  }
};

const GetAgentsAnalytics = async (id) => {
  try {
    const response = await axios.get(
      `${Api.api}/agent/agent-monthly-stats/${id}`
    );
    const Result = await response.data;
    console.log("Fetching Anlytics Data From Agent Routes");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error Fetching Analytics Data From Agent Routes:", error);
    return null;
  }
};

const GetCompetitorsDetailsDatas = async (CompetitorName) => {
  try {
    const response = await axios.get(
      `${Api.api}/competitor-report/competitor-reports/${CompetitorName}`
    );
    const Result = await response.data;
    console.log("Fetching Particular Competitor Datas");
    if (Result.success) {
      return Result.docs;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error Fetching Particular Competitor Datas:", error);
    return null;
  }
};

export {
  GetOpenBids,
  SendProcurementPrice,
  GetAgnetDetails,
  GetAgnetsListDistrictVice,
  GetAgentsOpenBids,
  GetAgentsBids,
  GetAgentsCompetitrosReport,
  GetAgentsAnalytics,
  GetCompetitorsDetailsDatas,
};
