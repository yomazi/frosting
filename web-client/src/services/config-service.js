import axios from "axios";

class ConfigService {
  static getEnvironmentInfo = async () => {
    try {
      const response = await axios.get("/api/v1/config");
      const envInfo = response.data;

      return envInfo;
    } catch (error) {
      console.error(error.message);

      return {};
    }
  };
}

export default ConfigService;
