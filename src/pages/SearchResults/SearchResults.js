import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../../services/youtubeAPI";
import VideoList from "../../components/VideoList/VideoList";
import QuotaMessage from "../../components/QuotaMessage/QuotaMessage";
import "./SearchResults.css";

function SearchResults() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const fetchSearchResults = useCallback(async (loadMore = false, token = "") => {
    setLoading(true);
    try {
      const { data, mock } = await fetchFromAPI(
        `search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=12${token ? `&pageToken=${token}` : ""}`
      );
      const items = data?.items || [];
      if (items.length === 0 && !loadMore) setMessage(`No videos found for "${query}".`);
      setVideos(prev => loadMore ? [...prev, ...items] : items);
      setNextPageToken(data.nextPageToken || "");
      setQuotaExceeded(mock);
    } catch {
      setMessage(`No videos found for "${query}".`);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");
    fetchSearchResults(false, "");
  }, [query, fetchSearchResults]);

  return (
    <div className="search-results-container">
      <h2 className="search-title">
        Search Results for: <span>{query}</span>
      </h2>
      {quotaExceeded && <QuotaMessage />}
      {videos.length > 0 ? <VideoList videos={videos} /> : <p className="no-results">{message}</p>}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {!quotaExceeded && nextPageToken && !loading && (
        <button className="load-more-btn" onClick={() => fetchSearchResults(true, nextPageToken)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default SearchResults;
