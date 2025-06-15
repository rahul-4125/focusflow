
# 🎯 FocusFlow – Elevate Your Daily Rhythm

**FocusFlow** is a modern full-stack productivity platform designed to help you manage your day with intention, focus deeply using Pomodoro sessions, log your mood for self-awareness, and gain insights from your routines — all in one seamless app.

---

## 🌟 Why I Built This

In today’s fast-paced world, staying organized isn’t enough — we also need clarity and emotional balance. **FocusFlow** was created to unify daily task tracking, focused work sessions, and emotional reflection into one powerful, elegant, and developer-friendly application.

---

## 🧠 Core Highlights

- ✅ **Task Management** – Create, categorize, set deadlines, and mark tasks complete
- ⏳ **Pomodoro Timer** – 25/5 cycle with auto-switching, session tracking, and ring progress
- 😊 **Mood Tracker** – Log your daily mood with emojis or sliders, limited to once per day
- 📊 **Insights Dashboard** – Charts showing productivity and mood trends over time (Recharts)
- 🔐 **Authentication** – Secure login/signup via JWT or Supabase
- 🌓 **Dark Mode & Responsive** – Desktop-first UI with mobile support and offline capability
- 🔔 **Notifications & Data Export** – Optional browser reminders and CSV/JSON export


## 🚀 Getting Started

### 1. Local Setup

Clone the repo and install dependencies:

```sh
git clone <this-repo-url>
cd <project-dir>
npm install
npm run dev
```

### 2. Backend Setup

You can use your own backend or connect to a third-party backend.

**Option A: Supabase**
- Create a new project on [Supabase](https://supabase.com/)
- Configure database and authentication.
- Copy your API keys and update the environment variables as instructed below.
- The app will communicate via REST/GraphQL endpoints.

**Option B: Node.js + Express + MongoDB/PostgreSQL**
- See `/server.example` for sample backend code.
- Configure `.env` and database connection.
- Run your backend server locally or via Docker.

### 3. Environment Variables

Example `.env.sample`:
```
MONGO_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
```
For Supabase, set up your project API keys in a `.env` file.

---

## 🔩 Folder Structure

```
/
  src/
    components/
      Header.tsx
      TaskList.tsx
      TaskForm.tsx
      PomodoroTimer.tsx
      MoodPicker.tsx
      ChartWrapper.tsx
      ...
    pages/
      Index.tsx
      Tasks.tsx
      Pomodoro.tsx
      Mood.tsx
      Insights.tsx
    store/
      tasks.ts
      pomodoro.ts
      mood.ts
    utils/
      api.ts
      date.ts
      storage.ts
    App.tsx
    ...
  /server.example
    models/
      User.js
      Task.js
      Pomodoro.js
      Mood.js
    routes/
      auth.js
      tasks.js
      pomodoros.js
      moods.js
    controllers/
      ...
    middleware/
      authMiddleware.js
      validation.js
    Dockerfile
    docker-compose.yml
    ...
```

---

## 🖥️ Production Deployment

- **Frontend**
  - Deploy the React app on Vercel, Netlify, or any static hosting platform.
- **Backend**
  - Deploy Express server (see `/server.example`) on a cloud provider (e.g., Render, Heroku, DigitalOcean).
  - Or use Supabase for a managed backend.

---

## 🧪 Testing

- **Frontend:**  
  - Uses React Testing Library (`src/__tests__/`)
- **Backend:**  
  - Jest + Supertest (see `/server.example/__tests__/`)

---

## 📝 Backend Example Structure

```
/server.example

  models/
    User.js
    Task.js
    Pomodoro.js
    Mood.js

  routes/
    auth.js        // signup/login (JWT)
    tasks.js       // CRUD (auth protected)
    pomodoros.js   // CRUD (auth protected)
    moods.js       // CRUD (auth protected)

  controllers/
    // Request handlers and business logic

  middleware/
    authMiddleware.js      // Verify JWT
    validation.js          // Zod or Joi schemas

  config/
    db.js (Mongoose/Postgres)
    env.js

  Dockerfile
  docker-compose.yml
  .env.sample
  README.md (server instructions)
  __tests__/
    tasks.test.js
    auth.test.js
```

---

## ⚙️ Example Dockerfile

```Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
```

## ⚙️ Example docker-compose.yml

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - ./mongo-data:/data/db
```

---

## 📑 Example Model (Mongoose)

```js
// models/Task.js
const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["Work", "Study", "Personal"], required: true },
  dueTime: { type: String },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Task", TaskSchema);
```

---

## 🛡️ Security & Quality

- CORS enabled, secure headers with Helmet
- Input validation with Zod/Joi
- ARIA/Keyboard/Screenreader accessibility
- ESLint, Prettier, GitHub Actions CI

---

## 🔒 Authentication

- JWT auth, bcrypt password hashing
- All user data/CRUD routes are auth-protected

---

## ✨ Bonus

- Dark mode, CSV/JSON export, browser notifications
- Fully responsive, animated, desktop-optimized UI

---

## 📚 Documentation

For more details, explore the codebase, check component docstrings, or see `/server.example/README.md`.

