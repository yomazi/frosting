import axios from "axios";

const getEnvironmentInfo = async () => {
  try {
    const response = await axios.get("/api/v1/config");
    const envInfo = response.data;

    console.log(envInfo);
    return envInfo;
  } catch (error) {
    console.error(error.message);

    return {};
  }
};

export { getEnvironmentInfo };
