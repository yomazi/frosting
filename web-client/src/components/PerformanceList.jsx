import { useEffect, useState } from "react";
import scrapeTheFreight from "../services/web-scraper";

const PerformanceList = ({ setIsLoggedIn }) => {
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const scrape = async () => {
      const newPerformanceList = await scrapeTheFreight();

      if (JSON.stringify(newPerformanceList) !== JSON.stringify(performances)) {
        setPerformances(newPerformanceList);
      }
    };

    scrape();
  }, []);

  return (
    <main id="performance-list">
      <ul>
        {performances.length ? (
          performances.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="title">
                {item.title}
              </a>
              <span>
                , {item.date}, {item.times}
              </span>
              <div className="description">{item.description}</div>
            </li>
          ))
        ) : (
          <li>No performances found.</li>
        )}
      </ul>
    </main>
  );
};

export default PerformanceList;
