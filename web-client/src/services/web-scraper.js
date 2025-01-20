import axios from "axios";

const scrapeTheFreight = async () => {
  try {
    const response = await axios.get("/api/v1/scrape-freight");
    const performanceList = response.data;

    return performanceList;
  } catch (error) {
    console.error(error.message);

    return [];
  }
};

export default scrapeTheFreight;
