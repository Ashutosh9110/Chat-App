📱 Anytime Chat — Real-Time Chat Application

A full-stack real-time chat application built using React + Vite, Node.js, and Supabase (PostgreSQL + Auth + Realtime).
The app supports authentication, channel-based messaging, presence, and typing indicators.


🚀 Live Demo

Frontend: Deployed on Netlify
Backend: Deployed on Render

🧰 Tech Stack
Frontend

React (Vite)

React Router DOM

TailwindCSS

Framer Motion

Axios

Supabase JS client

Backend

Node.js + Express

JSON Web Tokens (JWT)

Bcrypt for password hashing

Supabase Admin SDK

MongoDB (only if certain features needed)

CORS + dotenv

Database

PostgreSQL on Supabase

Supabase Auth

RLS (Row Level Security)

Realtime channels for live messages


Project Structure:


Chat-App/
│── Frontend/          # React client
│    ├── src/
│    ├── index.html
│    ├── vite.config.js
│
│── Backend/           # Express server
│    ├── server.js
│    ├── controllers/
│    ├── routes/
│    ├── models/
│    ├── .env
│
│── README.md


Realtime Features

The app uses Supabase Realtime to sync messages instantly.

Implemented features:

* Live message updates
* Fetching user profile for each message
* Presence tracking (online/offline)
* Typing indicators (optional feature implemented)

Authentication

Handled by Supabase Auth:

Email + password login

JWT verification on backend

Protected routes


Assumptions & Limitations:

Supabase Realtime is used; WebSocket disconnections may create brief sync delays.

Only basic moderation & validation are implemented.

The app requires stable internet connection for real-time events.


Optional Features Implemented

Typing Indicators

Shows "User is typing…" using Supabase Realtime presence.


Contributions:

Feel free to open issues or submit pull requests!

License
MIT License © 2025