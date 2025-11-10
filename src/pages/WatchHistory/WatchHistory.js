import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import VideoList from "../../components/VideoList/VideoList";
import "./WatchHistory.css";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("watchHistory");
    setHistory([]);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">
          Watch <span>History</span>
        </h2>
        {history.length > 0 && (
          <button className="clear-btn" onClick={clearHistory}>
            Clear History 🗑️
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="no-history">
          <p>No history yet! Start watching some videos 🎬</p>
          <button className="go-home-btn" onClick={() => navigate("/")}>
            <FaYoutube className="yt-icon" /> Go to Home
          </button>
        </div>
      ) : (
        <VideoList videos={history} />
      )}
    </div>
  );
}

export default WatchHistory;
