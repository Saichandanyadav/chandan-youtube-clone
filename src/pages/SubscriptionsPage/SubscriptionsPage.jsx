import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionsPage.css";

function SubscriptionsPage() {
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubs(data);
  }, []);

  return (
    <div className="subscriptions-page">
      <h2>Subscribed Channels</h2>
      {subs.length === 0 ? (
        <p>No subscriptions yet.</p>
      ) : (
        <div className="subs-list">
          {subs.map((ch) => (
            <div
              key={ch.id}
              className="sub-item"
              onClick={() => navigate(`/channel/${ch.id}`)}
            >
              <img src={ch.thumbnail} alt={ch.name} />
              <p>{ch.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscriptionsPage;
