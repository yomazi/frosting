import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPerformances } from "../redux/slices/performance-slice";
import styles from "../styles/performance-list.module.scss";
import Spinner from "./Spinner";

const PerformanceList = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const { performances, isLoading, error } = useSelector((state) => state.performances);

  useEffect(() => {
    dispatch(fetchPerformances());
  }, [dispatch]);

  return (
    <>
      <main id={styles.performanceList} className="mx-8 my-4">
        <ul>
          {performances.length ? (
            performances.map((item, index) => (
              <li className="mb-2" key={index}>
                <Link to="/show-reminders" state={{ item }} className="title">
                  {item.title}
                </Link>
                <span>
                  , {item.date}, {item.times}
                </span>
                <div className="description">{item.description}</div>
              </li>
            ))
          ) : (
            <li>{!isLoading && "No performances found."}</li>
          )}
        </ul>
      </main>
      <Spinner openOn={isLoading} />
    </>
  );
};

export default PerformanceList;
