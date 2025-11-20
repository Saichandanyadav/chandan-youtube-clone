import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFromAPI } from "../../services/youtubeAPI";
import "./VideoDetail.css";

function VideoDetail({ darkMode }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [channelIcon, setChannelIcon] = useState("");
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((res) => {
      const data = res.data || res;
      if (!data.items || data.items.length === 0) return;
      const selected = data.items[0];
      setVideo(selected);

      const history = JSON.parse(localStorage.getItem("watchHistory")) || [];
      const updated = [selected, ...history.filter((v) => v.id !== selected.id)];
      localStorage.setItem("watchHistory", JSON.stringify(updated.slice(0, 20)));
    });
  }, [id]);

  useEffect(() => {
    if (video?.snippet?.channelId) {
      fetchFromAPI(`channels?part=snippet&id=${video.snippet.channelId}`).then((res) => {
        const icon = res.data?.items?.[0]?.snippet?.thumbnails?.default?.url;
        setChannelIcon(icon || "");
      });
    }
  }, [video]);

  if (!video)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  const { snippet, statistics } = video;
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;

  return (
    <div className={`video-detail-container ${darkMode ? "dark" : ""}`}>
      <div className="video-frame">
        <iframe
          src={embedUrl}
          title={snippet.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info">
        <h2 className="video-title">{snippet.title}</h2>
        <div className="channel-info">
          <Link to={`/channel/${snippet.channelId}`} className="channel-link">
            <img
              src={channelIcon || "https://via.placeholder.com/36"}
              alt={snippet.channelTitle}
              className="channel-icon"
            />
            <span className="video-channel">{snippet.channelTitle}</span>
          </Link>
        </div>

        <p className="video-views">
          {Number(statistics?.viewCount || 0).toLocaleString()} views
        </p>

        <p className={`video-description ${showFullDesc ? "expanded" : ""}`}>
          {snippet.description}
        </p>

        {snippet.description.length > 150 && (
          <button
            className="toggle-desc-btn"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoDetail;
