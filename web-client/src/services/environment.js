import axios from "axios";

const getEnvironmentInfo = async () => {
  try {
    const response = await axios.get("/api/environment");
    const envInfo = response.data;

    return envInfo;
  } catch (error) {
    console.error(error.message);

    return {};
  }
};

export { getEnvironmentInfo };
