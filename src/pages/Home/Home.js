import React, { useState, useEffect, useCallback } from "react";
import { fetchFromAPI } from "../../services/youtubeAPI";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoList from "../../components/VideoList/VideoList";
import QuotaMessage from "../../components/QuotaMessage/QuotaMessage";
import "./Home.css";

function Home({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchVideos = useCallback(async (loadMore = false, token = "") => {
    if (loadMore) setLoadingMore(true);
    else setLoading(true);
    const endpoint =
      selectedCategory === "All"
        ? `videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=16${token ? `&pageToken=${token}` : ""}`
        : `search?part=snippet&q=${selectedCategory}&type=video&maxResults=25${token ? `&pageToken=${token}` : ""}`;
    const { data, mock } = await fetchFromAPI(endpoint);
    const newVideos = (data.items || []).filter((v) =>
      selectedCategory === "All" ? true : v.snippet.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setVideos(prev => loadMore ? [...prev, ...newVideos] : newVideos);
    setNextPageToken(data.nextPageToken || "");
    setQuotaExceeded(mock);
    setLoading(false);
    setLoadingMore(false);
  }, [selectedCategory]);

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");
    fetchVideos(false, "");
  }, [selectedCategory, fetchVideos]);

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} darkMode={darkMode} />
      <div className="home-videos">
        {quotaExceeded && <QuotaMessage />}
        <VideoList videos={videos} />
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {!quotaExceeded && nextPageToken && !loading && (
          <div className="load-more-container">
            {loadingMore ? (
              <div className="loader small"></div>
            ) : (
              <button className="load-more-btn" onClick={() => fetchVideos(true, nextPageToken)}>Load More</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
