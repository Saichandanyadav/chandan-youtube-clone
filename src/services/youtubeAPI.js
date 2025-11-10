import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

let useMock = false;

export const fetchFromAPI = async (endpoint) => {
  if (useMock) {
    const res = await fetch("/mockData/videos.json");
    const data = await res.json();
    return { data, mock: true };
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}&key=${API_KEY}`);
    useMock = false;
    return { data, mock: false };
  } catch (error) {
    if (error.response?.data?.error?.errors?.[0]?.reason === "quotaExceeded") {
      useMock = true;
      const res = await fetch("/mockData/videos.json");
      const data = await res.json();
      return { data, mock: true };
    }
    console.error("Error fetching from YouTube API:", error);
    return { data: { items: [] }, mock: true };
  }
};
