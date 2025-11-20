import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../../services/youtubeAPI";
import VideoList from "../../components/VideoList/VideoList";
import { FaCheckCircle, FaBell, FaBellSlash } from "react-icons/fa";
import "./ChannelDetail.css";

function ChannelDetail({ darkMode }) {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubscribed(subs.some((c) => c.id === id));
  }, [id]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchFromAPI(`channels?part=snippet,brandingSettings,statistics&id=${id}`),
      fetchFromAPI(`search?channelId=${id}&part=snippet,id&type=video&order=date&maxResults=25`)
    ])
      .then(async ([channelData, videoData]) => {
        const videoItems = videoData.data?.items || [];
        const ids = videoItems.map((v) => v.id.videoId).join(",");
        const stats = await fetchFromAPI(`videos?part=statistics,snippet&id=${ids}`);
        setChannel(channelData.data?.items?.[0] || null);
        setVideos(stats.data?.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubscribe = () => {
    const subs = JSON.parse(localStorage.getItem("subscriptions")) || [];
    if (subscribed) {
      const updated = subs.filter((c) => c.id !== id);
      localStorage.setItem("subscriptions", JSON.stringify(updated));
      setSubscribed(false);
    } else {
      const newChannel = {
        id,
        name: channel.snippet.title,
        thumbnail: channel.snippet.thumbnails.high.url
      };
      localStorage.setItem("subscriptions", JSON.stringify([...subs, newChannel]));
      setSubscribed(true);
    }
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (!channel)
    return <h2 className="not-found">Channel not found.</h2>;

  const { snippet, statistics, brandingSettings } = channel;

  const bannerUrl =
    brandingSettings?.image?.bannerExternalUrl ||
    "https://via.placeholder.com/1200x300?text=Channel+Banner";

  return (
    <div className={`channel-detail ${darkMode ? "dark" : ""}`}>
      <div className="channel-banner" style={{ backgroundImage: `url(${bannerUrl})` }}></div>
      <div className="channel-header">
        <img
          src={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          className="channel-avatar"
          onClick={() => navigate(`/channel/${id}`)}
        />
        <div className="channel-meta" onClick={() => navigate(`/channel/${id}`)}>
          <h2>{snippet?.title} <FaCheckCircle className="verified-icon" /></h2>
          <p>{Number(statistics?.subscriberCount || 0).toLocaleString()} subscribers</p>
        </div>
        <button
          className={`subscribe-btn ${subscribed ? "subscribed" : ""}`}
          onClick={handleSubscribe}
        >
          {subscribed ? (
            <>
              <FaBellSlash className="sub-icon" /> Subscribed
            </>
          ) : (
            <>
              <FaBell className="sub-icon" /> Subscribe
            </>
          )}
        </button>
      </div>
      {snippet?.description && <p className="channel-description">{snippet.description}</p>}
      <h3 className="channel-videos-title">Recent Uploads</h3>
      <div className="channel-videos-wrapper">
        <VideoList videos={videos} />
      </div>
    </div>
  );
}

export default ChannelDetail;
