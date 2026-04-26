# SPOTON — Dev Plan
### April 22 → May 1 (10 Days)

> Vibe coding approach — use AI (Cursor / Copilot / Claude) heavily throughout.
> Prioritize getting things working over making them perfect.
> Every day has a 📚 Learn section — read it before you start that day's tasks.

---

## Day 1 — April 22 | Project Setup

**Goal: Have a running app skeleton with auth working**

### 📚 Learn First
**What is Next.js?**
Next.js is a framework built on top of React. React lets you build UI as reusable components (think of a "PostCard" component you write once and reuse everywhere). Next.js adds routing, server-side data fetching, and deployment superpowers on top. When you run `npm run dev`, Next.js spins up a local server so you can see your app in the browser at `localhost:3000`.

**What is Supabase?**
Supabase is your backend-in-a-box. It gives you a database (PostgreSQL), user authentication, and real-time features — all without writing a server from scratch. Think of it as the engine room of your app. You connect to it from Next.js using their JavaScript library.

**What is OAuth?**
OAuth is a system that lets users log in with another service (like Spotify) without you ever handling their Spotify password. When a user clicks "Connect Spotify", Spotify asks "do you allow SPOTON to access your data?" — if they say yes, Spotify sends back a token (like a temporary key) your app uses to make requests on their behalf.

**What is `.env.local`?**
Environment variables are secret values your app needs but should never be public (like API keys). `.env.local` is a file where you store them locally. Adding it to `.gitignore` tells Git to never upload that file — keeping your secrets safe.

### ✅ Tasks
- [ ] Create Next.js app (`npx create-next-app@latest spoton`)
- [ ] Set up Supabase project — get URL + anon key
- [ ] Set up Spotify Developer app — get Client ID + Secret
- [ ] Wire up email auth via Supabase (sign up, verify, log in)
- [ ] Connect Spotify OAuth so users can link their Spotify account
- [ ] Push initial repo to GitHub
- [ ] Add `.env.local` to `.gitignore` ⚠️

**Done when:** You can sign up with email, verify it, and connect Spotify.

---

## Day 2 — April 23 | Onboarding + Profile

**Goal: First-time user experience is complete**

### 📚 Learn First
**What is a database table?**
A table is like a spreadsheet. Your `profiles` table will have columns like `user_id`, `display_name`, `avatar_url`, and `top_genres` — and each row is one user's data. Supabase uses PostgreSQL, which is one of the most trusted databases in the world.

**What is an API call?**
When your app needs data from Spotify (like a user's top artists), it sends an API call — basically a request saying "hey Spotify, give me this user's top 10 artists." Spotify sends back a JSON response (a structured list of data) and your app reads it. You'll use the token from Day 1 to prove you're allowed to ask.

**What is Tailwind CSS?**
Tailwind is a styling system where instead of writing separate CSS files, you add class names directly to your HTML elements. For example `className="bg-black text-white rounded-lg p-4"` gives you a black rounded card with white text and padding. Dark/light mode in Tailwind works by adding a `dark:` prefix — so `dark:bg-white` only applies in dark mode.

### ✅ Tasks
- [ ] Onboarding flow (3 steps: verify email → connect Spotify → pick display name + avatar)
- [ ] Supabase `profiles` table (user_id, display_name, avatar_url, top_genres, top_artists)
- [ ] Pull user's top artists + genres from Spotify API and save to profile
- [ ] Basic profile page UI (display name, top genres as tags, avatar)
- [ ] Dark / Light mode toggle with Tailwind

**Done when:** A new user can complete onboarding and see their profile.

---

## Day 3 — April 24 | Home Feed

**Goal: Core feed UI is live**

### 📚 Learn First
**What is a database relationship?**
Your `posts` table has a `user_id` column that links each post to a user in the `profiles` table. This is called a foreign key — it's how you connect data across tables. When you fetch posts for the feed, you can also fetch the poster's display name in one query by joining the tables.

**What is a React component?**
A component is a reusable piece of UI. Your `PostCard` component takes a post's data as props (inputs) and returns the HTML to display it. You write it once, and the feed just maps over your list of posts and renders a `<PostCard />` for each one.

**What is `async/await`?**
When your app fetches data from Supabase or Spotify, it takes a moment — it doesn't happen instantly. `async/await` is how JavaScript handles waiting. Instead of freezing the whole page, it says "go fetch this data, and when it arrives, continue." You'll see this pattern everywhere in your code.

### ✅ Tasks
- [ ] Supabase `posts` table (user_id, playlist_id, caption, created_at)
- [ ] Create post screen — pick a Spotify playlist, write a caption, post it
- [ ] Home feed page — fetch and display posts as cards
- [ ] Each post card shows: playlist cover art, playlist name, caption, poster's display name
- [ ] Stories bar at the top (placeholder UI for now, fill in Day 5)

**Done when:** You can post a playlist and see it in your feed.

---

## Day 4 — April 25 | Discover + Music Matching

**Goal: People can find each other through music taste**

### 📚 Learn First
**What is a compatibility algorithm?**
It sounds complex but it's just math. If you and another user both love Arctic Monkeys and Billie Eilish, that's 2 shared artists. Divide shared artists by total unique artists between you both — that percentage is your compatibility score. You can do the same for genres. No machine learning needed, just logic.

**What is a Supabase query?**
Supabase gives you a JavaScript library to talk to your database without writing raw SQL. For example: `supabase.from('profiles').select('*').neq('user_id', currentUser.id)` means "give me all profiles except my own." You'll write queries like this to fetch users for the Discover page.

**What is state in React?**
State is data that lives inside a component and can change over time. If you click "Follow" on a user card, the button should change to "Following" — that's state changing. You use `useState` in React to create and update state. When state changes, React automatically re-renders just that part of the UI.

### ✅ Tasks
- [ ] Discover page UI (scrollable user suggestion cards)
- [ ] Compatibility score logic — compare top artists/genres between users
- [ ] Each suggestion card shows: display name, avatar, top 3 artists, compatibility %
- [ ] Follow/connect button on each card
- [ ] Basic follow system in Supabase (`follows` table)

**Done when:** You can browse suggested users and follow them.

---

## Day 5 — April 26 | Stories

**Goal: Mood stories feature is working**

### 📚 Learn First
**What is a TTL (Time To Live)?**
Stories disappear after 24 hours — that's handled by an `expires_at` column in your `stories` table. When you create a story, you set `expires_at` to "now + 24 hours." When fetching stories, you filter to only show ones where `expires_at` is in the future. The row stays in the database but it becomes invisible to users once it expires. You can set up a Supabase cron job later to clean up old rows.

**What is conditional rendering?**
In React, you can show or hide UI based on conditions. For example: `{isExpired ? null : <StoryCircle />}` — if the story is expired, render nothing; otherwise show the circle. You'll use this pattern constantly, especially for loading states and empty states.

**What is `useEffect`?**
`useEffect` is a React hook that runs code after your component loads. Fetching stories from Supabase when the home page opens is a perfect `useEffect` use case — "when this page loads, go fetch the latest stories and put them in state."

### ✅ Tasks
- [ ] Stories as 3-song playlists — create story screen (pick 3 songs or a short playlist)
- [ ] Supabase `stories` table (user_id, playlist_id, expires_at — 24hr TTL)
- [ ] Stories bar on home feed renders followed users' active stories
- [ ] Tap a story to view the 3 songs + play them
- [ ] Stories auto-expire after 24 hours

**Done when:** You can post a 3-song story and it shows up in the stories bar.

---

## Day 6 — April 27 | Chat System

**Goal: DMs are working in real time**

### 📚 Learn First
**What is Supabase Realtime?**
Normal database queries are one-shot — you ask, you get an answer, done. Realtime is different: you subscribe to a table and Supabase pushes updates to your app the moment data changes. So when your friend sends you a message, Supabase instantly notifies your open chat window without you having to refresh. It works over WebSockets — a persistent connection between your browser and Supabase.

**What is a WebSocket?**
Regular HTTP requests are like sending a letter — you send it, wait for a reply, conversation over. A WebSocket is like a phone call — the connection stays open and both sides can talk whenever. Supabase Realtime uses this under the hood so your chat feels instant.

**How do chat tables work?**
Your `messages` table stores every message with a `sender_id`, `receiver_id`, `content`, and `created_at`. To show a chat thread between two users, you query for messages where `sender_id = me AND receiver_id = them` OR `sender_id = them AND receiver_id = me`. Order by `created_at` and you get the conversation in order.

### ✅ Tasks
- [ ] Supabase `messages` table (sender_id, receiver_id, content, created_at)
- [ ] Chat list screen — shows all your conversations
- [ ] Individual chat thread screen — real-time messages using Supabase Realtime
- [ ] Basic message send/receive UI (clean bubbles, minimal)
- [ ] Chat accessible from a user's profile or discover card

**Done when:** You can open a chat and send/receive messages in real time.

---

## Day 7 — April 28 | Playlist Chat Feature

**Goal: The signature feature — playlists play during chat**

### 📚 Learn First
**What is the Spotify Web Playback SDK?**
The regular Spotify API just gives you data. The Web Playback SDK actually plays music — it turns your app into a Spotify player. You embed a script, initialise a "player" object in JavaScript, and then you can call `player.play()`, `player.pause()` etc. It streams directly to the user's browser. This is why Premium is required — streaming is a Premium feature.

**What is an SDK vs an API?**
An API (Application Programming Interface) is a set of endpoints you send requests to — you ask, it responds with data. An SDK (Software Development Kit) is a library you install that does more complex things for you, like managing a music player's state, handling errors, and communicating with Spotify's servers in the background. The Playback SDK wraps a lot of complexity so you don't have to manage it yourself.

**What is a graceful fallback?**
Not every user will have Spotify Premium. A graceful fallback means your app doesn't crash or look broken for them — instead it shows a friendly message like "Your friend made you a playlist! Open it in Spotify to listen 🎵" with a link. Good apps handle edge cases kindly.

### ✅ Tasks
- [ ] "Make them a playlist" button inside each chat thread
- [ ] Playlist picker — search and select a Spotify playlist to dedicate to them
- [ ] Save dedicated playlist to Supabase (`chat_playlists` table)
- [ ] At the top of each chat, show the playlist your friend made for you
- [ ] Embed Spotify Web Playback SDK — playlist plays softly in the background while chatting
- [ ] Handle Premium requirement gracefully (show message if user doesn't have Premium)

**Done when:** A playlist appears at the top of a chat and plays while you text.

---

## Day 8 — April 29 | Listening Rooms

**Goal: Live shared listening rooms are working**

### 📚 Learn First
**How does music sync work across users?**
The trick is broadcasting the "current track position" — not the audio itself. Each room has a host. The host's Spotify player sends its current track URI (the song identifier) and timestamp (how many seconds in) to Supabase Realtime every few seconds. Everyone else in the room listens to that broadcast and tells their Spotify player to play the same song at the same position. It's not perfect sync but it's close enough to feel shared.

**What is a Supabase channel?**
Realtime uses channels to organise broadcasts. Think of a channel like a radio frequency — everyone tuned to channel `room:abc123` hears the same broadcasts. You create a channel per listening room, and everyone in that room subscribes to it. When the host broadcasts "now playing: song X at 1:34", everyone receives it instantly.

**What is a presence system?**
Supabase Realtime has a "presence" feature — it tracks which users are currently connected to a channel. This is how you show "5 people are listening right now" in a room. When someone joins, presence adds them. When they close the tab or leave, presence removes them automatically.

### ✅ Tasks
- [ ] Listening rooms page — browse active rooms + create a room
- [ ] Supabase `rooms` table (host_id, playlist_id, room_name, is_active)
- [ ] Create room flow — pick a playlist, give it a name, go live
- [ ] Join a room — everyone hears the same track position (sync via Supabase Realtime)
- [ ] Live chat sidebar inside the room
- [ ] Room dissolves when host leaves or playlist ends

**Done when:** Two people can join a room and hear the same song at the same time with live chat.

---

## Day 9 — April 30 | Polish + Listening Badge

**Goal: App feels complete and looks good**

### 📚 Learn First
**What is a loading state?**
When your app fetches data, there's a gap between asking and receiving. Without a loading state, the user sees a blank screen and thinks something broke. A loading state shows a spinner or skeleton UI during that gap. In React: `if (isLoading) return <Spinner />` — simple as that.

**What is an empty state?**
When a user is new and has no posts, no chats, no followers — what do they see? An empty state is a friendly screen that explains what this section is and nudges them to take action. e.g. "No posts yet — share your first playlist 🎵". It makes the app feel alive even when it's empty.

**What is error handling?**
Things go wrong — Spotify's API goes down, a network request fails, a user's token expires. Error handling means your app catches these problems and shows a human-friendly message instead of crashing. In JavaScript, `try { } catch (error) { }` blocks let you attempt something and handle failure gracefully.

### ✅ Tasks
- [ ] Listening personality badge — logic to generate a fun label from top genres
  - e.g. "Melancholic Indie Kid", "Hyperpop Gremlin", "Sad Girl Autumn Core"
- [ ] Show badge on profile page
- [ ] UI polish pass — spacing, colors, transitions, loading states
- [ ] Empty states (no posts yet, no chats yet, etc.)
- [ ] Error handling for Spotify API failures
- [ ] Test full user journey end to end

**Done when:** App feels smooth and complete from signup to all features.

---

## Day 10 — May 1 | Deploy + Ship to GitHub

**Goal: SPOTON is live and on your portfolio**

### 📚 Learn First
**What is Vercel?**
Vercel is the company that made Next.js, and their hosting platform is perfectly tuned for it. You connect your GitHub repo, and every time you push code, Vercel automatically deploys the latest version. It's free for personal projects and gives you a real URL (like `spoton.vercel.app`) in minutes.

**What are environment variables in production?**
Your `.env.local` file never gets pushed to GitHub (remember `.gitignore`). So when Vercel builds your app, it doesn't have your secrets. You add them manually in the Vercel dashboard under Settings → Environment Variables — paste the same keys from your `.env.local`. Vercel securely injects them at build time.

**Why does a public GitHub repo matter?**
Recruiters and other developers look at GitHub to see how you think and build. A clean repo with a good README, regular commits, and working code is more impressive than a resume line that says "built a social app." It's proof. The commit history also shows you actually built it day by day, which is authentic.

### ✅ Tasks
- [ ] Deploy to Vercel (connect GitHub repo, add env variables)
- [ ] Test on live URL
- [ ] Final README check — update GitHub username, add live URL
- [ ] Push everything to GitHub
- [ ] Write a LinkedIn post about it 🎉

**Done when:** SPOTON has a live URL and a public GitHub repo.

---

## If You Run Short on Time

Cut in this order — least essential first:

1. Listening personality badge (Day 9) — fun but not core
2. Listening rooms (Day 8) — impressive but complex
3. Stories (Day 5) — can launch without it
4. Compatibility score logic (Day 4) — can show random suggestions instead

**Must-haves for a solid portfolio project:** Auth, profiles, feed, chat, and playlist chat feature.

---

## Daily Vibe Coding Tips

- Read the 📚 Learn section before starting each day — it'll make the AI's code explanations click
- Start each session by telling your AI exactly what you're building — be specific
- When the AI writes code you don't understand, ask it: *"explain this line by line like I'm new to this"*
- When stuck, paste the error + your code and ask for a fix — don't debug manually
- Commit to GitHub at the end of every day so you never lose progress
- Don't perfect the UI until Day 9 — functionality first, beauty later

---

*Good luck Ankitha — you're going to learn a ton building this! 🎵*
