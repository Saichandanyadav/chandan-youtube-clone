# 🎬 **Chandan YouTube Clone**

Welcome to **Chandan YouTube Clone** — a lightweight, responsive, and dynamic YouTube-style web app built with **ReactJS** ⚛️.
It fetches live videos using the **YouTube Data API v3** and seamlessly switches to **mock data** when API quota limits are reached.

Experience category browsing, searching, dark mode, and video playback — all in one smooth interface. 🎥✨

🌐 **Live Demo:** [https://chandan-youtube-clone.vercel.app/](https://chandan-youtube-clone.vercel.app/)

💻 **GitHub Repository:** [https://github.com/Saichandanyadav/chandan-youtube-clone](https://github.com/Saichandanyadav/chandan-youtube-clone)

---

## 🌟 **Features**

🔥 **Core Highlights:**

* 📺 Real-time video fetching via YouTube API
* 🧩 Auto fallback to mock data when quota exceeds
* 🔍 Smart search and category-based filters
* 🎥 Dedicated video player with title, channel & stats
* 🕶️ Built-in dark / light mode
* 💾 Local watch history storage
* 📱 100% responsive — optimized for desktop, tablet & mobile
* ⚡ Minimal, elegant UI

---

## ⚙️ **Installation Guide**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Saichandanyadav/chandan-youtube-clone.git
cd chandan-youtube-clone
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` File

Add your API key to a new `.env` file in the root folder:

```env
REACT_APP_YOUTUBE_API_KEY=YOUR_API_KEY_HERE
```

### 4️⃣ Run the Project

```bash
npm start
```

### 5️⃣ Build for Production

```bash
npm run build
```

---

## 🔑 **How to Create a YouTube Data API Key (Step-by-Step Guide)**

Follow these steps carefully 🧭

1. 🌐 **Go to Google Cloud Console:**
   👉 [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. 📂 **Create or Select a Project:**

   * Click the **Project Selector** dropdown at the top.
   * Choose **New Project**, name it (e.g., `YouTubeCloneProject`), and click **Create**.

3. 🎬 **Enable YouTube Data API v3:**

   * Go to **APIs & Services → Library**.
   * Search for **YouTube Data API v3** and click **Enable**.

4. 🔐 **Create API Credentials:**

   * Navigate to **APIs & Services → Credentials**.
   * Click **Create Credentials → API Key**.
   * Copy the generated key.

5. 🛡️ **Restrict the API Key (Recommended):**

   * Click your API key → **Edit Key**.
   * Under **Application Restrictions**, select **HTTP referrers (websites)**.
   * Add these URLs:

     ```
     http://localhost:3000
     https://chandan-youtube-clone.vercel.app/
     ```
   * Under **API Restrictions**, choose **YouTube Data API v3** → Save.

6. 📊 **Monitor API Quota:**

   * Go to **APIs & Services → Quotas**.
   * If your quota exceeds, the app auto-loads mock data for continuous functionality.

---

## 🧩 **Environment Variables Example**

```env
REACT_APP_YOUTUBE_API_KEY=AIzaSyD...
```

Restart your development server after modifying `.env`:

```bash
npm start
```

---

## 🗂️ **Project Structure**

```
chandan-youtube-clone/
│
├── public/
│   ├── mockData/
│   │   └── videos.json
│   ├── index.html
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── youtubeAPI.js
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

---

## 🧠 **Sample Mock Data (videos.json)**

When the API quota exceeds, your app switches to mock data automatically.

```json
{
  "kind": "youtube#searchResult",
  "etag": "v-etag-1",
  "id": {
    "kind": "youtube#video",
    "videoId": "bMknfKXIFA8"
  },
  "snippet": {
    "publishedAt": "2023-11-05T15:30:00Z",
    "channelId": "UCsBjURrPoeaKhTPDchF9cQ",
    "title": "React 18 Crash Course | Build 4 Projects with React",
    "description": "An in-depth React 18 course for beginners. Covers hooks, state management, and routing. Build four practical applications.",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/bMknfKXIFA8/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/bMknfKXIFA8/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
        "width": 480,
        "height": 360
      }
    },
    "channelTitle": "freeCodeCamp.org",
    "liveBroadcastContent": "none",
    "publishTime": "2023-11-05T15:30:00Z"
  }
}
```

💡 Include 20–25 entries to simulate a full video feed for testing.

---

## 🚀 **Deployment**

You can easily deploy your app to:

* 🌐 [**Vercel**](https://vercel.com/)
* ☁️ [**Netlify**](https://www.netlify.com/)
* 🧭 [**GitHub Pages**](https://pages.github.com/)

After deployment:
✅ Add your domain in **Google Cloud Console → API Key Restrictions**
✅ Build your app:

```bash
npm run build
```

✅ Deploy the `/build` folder.

---

## 🧰 **Troubleshooting**

| ⚠️ Issue                        | 💡 Solution                                  |
| ------------------------------- | -------------------------------------------- |
| **Quota Exceeded**              | Auto fallback to mock data                   |
| **403 Forbidden / Invalid Key** | Verify `.env` and enable YouTube Data API v3 |
| **CORS Errors**                 | Add domain in API referrer restrictions      |
| **Blank Page / No Videos**      | Check API response or key validity           |
| **.env Not Loading**            | Restart app with `npm start`                 |

---

## 👨‍💻 **Author**

👨‍💻 **Developed by:** **Sai Chandan Yadav** 🚀

🔗 **YouTube:** [@saichandanyadav](https://www.youtube.com/@saichandanyadav/videos)

📧 **Email:** [saichandhanyadav2002@gmail.com@gmail.com](mailto:saichandhanyadav2002@gmail.com@gmail.com)

---

## 🪪 **License**

📜 Licensed under the **MIT License** — you are free to use, modify, and share for educational and personal development.

---

## 💖 **Support & Feedback**

⭐ If you like this project, don’t forget to star the repo and subscribe to my YouTube channel!
💬 Feel free to reach out via email for collaboration or feedback.
