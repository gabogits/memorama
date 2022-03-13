import React, { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Loader from "../components/templates/Loader";
import { getScores } from "../helpers/getScores";

const Ranking = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const scores = await getScores();
      setScores(scores);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {scores.length > 0 && (
        <div className="ranking-container">
          {scores.map((item) => (
            <div className="list-block" key={item._id}>
              <div className="list-item">
                <div className="left-content">
                  <div className={`block-icon }`}>
                    <img
                      src={require(`../assets/images/avatar/${item.avatar}.png`)}
                      alt="avatar"
                    />
                  </div>
                  <div className="text-block">
                    <h4>{item.name}</h4>
                    <p>{item.time}</p>
                  </div>
                </div>
                <div className="right-content">
                  <h3>{item.score}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Ranking;
