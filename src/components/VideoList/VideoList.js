import React from "react";
import VideoCard from "../VideoCard/VideoCard";
import "./VideoList.css";

function VideoList({ videos = [] }) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "1rem" }}>No videos found.</p>;
  }

  return (
    <div className="youtube-video-list">
      {videos.map((video, index) => {
        const uniqueKey = video.id?.videoId || video.id || `${video.snippet.title}-${index}`;
        return <VideoCard key={uniqueKey} video={video} />;
      })}
    </div>
  );
}

export default VideoList;
