
# FocusFlow

A modern fullstack productivity web app for managing tasks, running Pomodoro sessions, logging daily mood, and tracking insights.

## ✨ Features

- **Tasks**: CRUD tasks, categorize, due time, mark complete
- **Pomodoro**: 25/5 timer, auto-switch, session count, progress ring
- **Mood**: Emoji & slider, log 1 per day, mood trends
- **Insights**: Charts for tasks, pomodoros, mood over time (Recharts)
- **Authentication**: Secure login/signup (via Supabase or your backend)
- **Responsive & Desktop-first UI:** Modern, accessible, beautiful (Vite + React + Tailwind + Zustand + shadcn/ui)
- **Dark mode**, browser notifications, data export, offline support

---

## 🚀 Getting Started

### 1. Local Setup

```sh
git clone <this-repo-url>
cd <project-dir>
npm install
npm run dev
```

### 2. Backend Setup

**Option A: Supabase (Recommended for Lovable users)**
- [Follow Lovable's Supabase integration guide](https://docs.lovable.dev/integrations/supabase/) to add DB/auth, enable JWT auth, and auto-generate endpoints for tasks, sessions, mood.

**Option B: Node.js + Express + MongoDB/PostgreSQL (Manual)**
- See `/server.example` (sample code below)—copy to your own /server repo.
- Configure `.env` as per `.env.sample` below.
- Run with Docker or locally (`npm install && npm start`).

### 3. Environment Variables

Example `.env.sample`:
```
MONGO_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
```
If using Supabase, set up and copy your project keys via their dashboard and Lovable UI.

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
  - Deploy `src/` on Vercel, Netlify, or a static host.
- **Backend**
  - Deploy Express API (see `/server.example`) on Render/Heroku/DigitalOcean.
  - _Or_ use Supabase with Lovable's built-in integration (recommended on Lovable).

---

## 🧪 Testing

- **Frontend:**  
  - React Testing Library, minimal examples in `src/__tests__/`
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
- 100% responsive, animated, desktop-optimized UI

---

## 📚 Full Documentation

- See `/server.example/README.md` or ask for more examples.

