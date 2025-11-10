import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromAPI } from "../../services/youtubeAPI";
import "./VideoCard.css";

function VideoCard({ video }) {
  const { id, snippet, statistics } = video || {};
  const videoId = id?.videoId || id;
  const [channelIcon, setChannelIcon] = useState("");

  useEffect(() => {
    if (snippet?.channelId) {
      fetchFromAPI(`channels?part=snippet&id=${snippet.channelId}`).then(({ data }) => {
        const icon = data?.items?.[0]?.snippet?.thumbnails?.default?.url;
        setChannelIcon(icon || "");
      });
    }
  }, [snippet?.channelId]);

  if (!snippet) return null;

  return (
    <div className="youtube-card">
      <Link to={`/video/${videoId}`} className="youtube-thumb">
        <img
          src={snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url}
          alt={snippet?.title}
        />
      </Link>
      <div className="youtube-info">
        <Link to={`/channel/${snippet.channelId}`} className="youtube-avatar">
          <img src={channelIcon || "https://via.placeholder.com/36"} alt={snippet.channelTitle} />
        </Link>
        <div className="youtube-text">
          <h4 className="youtube-title">
            <Link to={`/video/${videoId}`} className="youtube-title-link">
              {snippet?.title}
            </Link>
          </h4>
          <p className="youtube-channel">
            <Link
              to={`/channel/${snippet.channelId}`}
              className="youtube-channel-link"
              onClick={(e) => e.stopPropagation()}
            >
              {snippet.channelTitle}
            </Link>
          </p>
          {statistics && (
            <small className="youtube-stats">
              {Number(statistics.viewCount).toLocaleString()} views •{" "}
              {new Date(snippet.publishedAt).toLocaleDateString()}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
