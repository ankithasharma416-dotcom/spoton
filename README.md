# 🎵 SPOTON

> *Connect through music. Anonymous by design.*

SPOTON is a social media app where people connect through their music taste — not their faces, phone numbers, or follower counts. Powered by the Spotify API, SPOTON matches you with others based on what you actually listen to, and lets you communicate through playlists.

---

## ✨ What Makes SPOTON Different

Most social apps ask you to perform an identity. SPOTON lets your music speak for you.

- **Anonymous profiles** — no phone number, no real name required. Just an email to verify you're a real person.
- **Music-based matching** — discover people with compatible taste using Spotify listening data.
- **Playlist chat** — when you text someone, you can build them a playlist that plays on their phone while you talk. They build one back. Your conversation has a soundtrack.
- **Mood stories** — instead of photo stories, share a 3-song playlist as your "vibe of the day."
- **Listening rooms** — temporary shared spaces where strangers listen to the same playlist together and can chat in real time. Low pressure, no commitment — just vibing together.
- **One account per person** — keeps the space honest and personality-authentic.

---

## 🖼️ App Screens

| Screen | Description |
|---|---|
| **Home Feed** | Stories bar + playlist posts from people you follow |
| **Discover** | Music taste-based user suggestions with compatibility scores |
| **Chat** | DMs with a live playlist layer — their playlist for you plays in the background |
| **Profile** | Your anonymous identity — top genres, playlists, and listening personality badge |
| **Create** | Post a playlist with a caption to your feed |
| **Listening Rooms** | Join or create a live room where strangers listen to the same playlist together and chat in real time |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (React) |
| **Backend / Auth** | Supabase (email auth + database + realtime) |
| **Music API** | Spotify Web API + Web Playback SDK |
| **Styling** | Tailwind CSS |
| **Hosting** | Vercel |

---

## 🎨 Design

SPOTON blends the familiarity of **Instagram's layout** with the dark aesthetic of **Spotify's UI**.

- **Dark Mode** — `#0A0A0A` base, `#1DB954` green accent, `#9B59B6` purple for social features
- **Light Mode** — `#F7F7F7` base, same green and purple accents for brand consistency
- Card-based feed, bottom tab navigation, album art as visual texture throughout

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Spotify Developer](https://developer.spotify.com/dashboard) account (free)
- A [Supabase](https://supabase.com) account (free)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/spoton.git
cd spoton
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ **Never commit your `.env.local` file.** It's already in `.gitignore`.

### 4. Set up Spotify Developer App

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:3000/api/auth/callback` as a Redirect URI
4. Copy your Client ID and Client Secret into `.env.local`
5. In development mode, add test users under "User Management"

> 💡 Spotify's Web Playback SDK (in-app music playback) requires Spotify Premium for the listening user. All other API features are free.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see SPOTON.

---

## 🗺️ Roadmap

- [x] Project concept & planning
- [ ] Authentication (email + Spotify OAuth)
- [ ] User profile setup
- [ ] Home feed with playlist posts
- [ ] Stories (3-song mood playlists)
- [ ] Music taste-based user discovery
- [ ] DM chat system
- [ ] Playlist chat feature (live background playback)
- [ ] Listening personality badge generator
- [ ] Listening rooms (live shared playback + chat)
- [ ] Dark / Light mode toggle

---

## 🔒 Privacy by Design

SPOTON is built with anonymity as a core principle:

- No phone numbers collected
- Display names are chosen, not real names
- Email is used only for account verification — never displayed
- One account per email prevents duplicate personalities
- Spotify data is used only for matching and features within the app

---

## 👩‍💻 About

Built by **Ankitha Sharma** as a personal project to explore the intersection of music, identity, and social connection.

> *"What if instead of following people, you found your people through a playlist?"*

---

## 📄 License

This project is for personal/portfolio use. Feel free to fork and build on it — just give credit!
