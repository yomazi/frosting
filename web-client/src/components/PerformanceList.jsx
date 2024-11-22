import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformances } from "../redux/slices/performanceSlice";
import styles from "../styles/performance-list.module.scss";

const PerformanceList = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const { performances, isLoading, error } = useSelector(
    (state) => state.performances,
  );

  useEffect(() => {
    dispatch(fetchPerformances());
  }, [dispatch]);

  return (
    <main id={styles.performanceList} className="mx-8 my-4">
      <ul>
        {performances.length ? (
          performances.map((item, index) => (
            <li className="mb-2" key={index}>
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
