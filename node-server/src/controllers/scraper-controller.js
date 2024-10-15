const axios = require("axios");
const cheerio = require("cheerio");
const { DateTime } = require("luxon");

const _removeOrdinalDaySuffix = (dateString) => {
  const cleanedDateString = dateString.replace(/\b(\d+)(st|nd|rd|th)\b/, "$1");

  return cleanedDateString;
};

const _scrapeFreightWebsite = async () => {
  const { data } = await axios.get("https://thefreight.org/shows", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
    },
  });

  return data;
};

const _scrapePerformanceData = (card, $) => {
  const presentedBy = $(card).find(".presentedby").text().trim();
  const isRental = presentedBy === "RENTAL EVENT";
  const isLivestreamAvailable = presentedBy.startsWith("LIVESTREAM AVAILABLE");
  const imageUrl = $(card).find(".image-url").attr("href");
  const title = $(card).find(".event-name a").text().trim();
  const link = $(card).find(".event-name a").attr("href");
  const date = $(card).find(".date-time .dates").text().trim();
  const cleanedDate = _removeOrdinalDaySuffix(date);
  const dateObject = DateTime.fromFormat(cleanedDate, "EEEE, MMM d yyyy");
  const times = $(card).find(".date-time .start").text().trim();

  const performance = {
    isRental,
    isLivestreamAvailable,
    goldTicketsAvailable: isRental ? 0 : 10,
    imageUrl: imageUrl || "No image URL",
    title: title || "No Title",
    link: link || "No Link",
    date: date || "No Date",
    dayOfWeek: dateObject.weekday,
    day: dateObject.day,
    month: dateObject.month,
    year: dateObject.year,
    times: times || "No Times",
  };

  return performance;
};

const scrapeTheFreight = async (req, res) => {
  try {
    const data = await _scrapeFreightWebsite();
    const $ = cheerio.load(data);
    const cards = $(".list-view-item.card").toArray();
    const performances = cards.map((card) => {
      return _scrapePerformanceData(card, $);
    });

    console.log(performances);
    // Send the analyzed data as a JSON response
    res.json(performances);
  } catch (error) {
    console.error("Error scraping thefreight.org:", error);
    res.status(500).json({
      error: `Failed to fetch and analyze thefreight.org: ${error.message}`,
    });
  }
};

module.exports = { scrapeTheFreight };
