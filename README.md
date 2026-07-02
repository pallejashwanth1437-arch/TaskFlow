# TaskFlow – Smart Task Management Dashboard

> Organize. Prioritize. Accomplish.

TaskFlow is a premium, full-stack task management application built using the MERN stack. It features a highly polished, cinematic UI powered by Three.js and Framer Motion, enabling users to organize and track their daily tasks within a distraction-free, exclusive environment.

---

## ✨ Features
- **Cinematic UI**: 3D interactive WebGL backgrounds, subtle film grain overlays, and physics-based card hover effects.
- **Smart Dashboard**: Instantly track your Completion Percentage, Pending, In Progress, and Completed tasks.
- **Task Management**: Full CRUD capabilities (Create, Read, Update, Delete) with MongoDB persistence.
- **Organization**: Categorize by tags (Work, Study, Personal, etc.) and prioritize (High, Medium, Low).
- **Pinning System**: Pin your most critical tasks to the top of your deck.
- **Advanced Filtering**: Instantly search by title/description, filter by status and priority, and sort by due date or creation time.
- **Real-time UX**: Built with React Context API to ensure instant, optimistic UI updates without refreshing.

---

## 🛠️ Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS (v4) for utility-first styling
- Framer Motion for physics-based animations
- Three.js (@react-three/fiber) for 3D backgrounds
- Lucide React for crisp iconography
- Axios for API requests

**Backend:**
- Node.js & Express.js
- MongoDB Atlas (Cloud Database)
- Mongoose (ODM)
- Custom MVC architecture & Error Handling

---

## 📂 Folder Structure

```text
TaskFlow/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (TaskCard, Modals, 3D Canvas)
│   │   ├── context/        # TaskContext API state manager
│   │   ├── pages/          # Welcome and Dashboard pages
│   │   ├── services/       # Axios API configurations
│   │   ├── index.css       # Global styles, Glassmorphism, Cinematic grain
│   │   └── App.jsx         # React Router setup
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/             # MongoDB connection logic
│   ├── controllers/        # Route controllers (CRUD operations)
│   ├── middleware/         # Error handlers and validation
│   ├── models/             # Mongoose Task Schema
│   ├── routes/             # API Route definitions
│   ├── .env                # Environment variables (IGNORED IN GIT)
│   ├── server.js           # Server entry point
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Set up the Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your MongoDB Atlas URI:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority
```
Start the backend server:
```bash
npm run start
```

### 3. Set up the Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The application will now be running at `http://localhost:5173`.

---

## 🔌 API Endpoints

The backend operates on `http://localhost:5000/api`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Fetch all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an entire task |
| `PATCH` | `/tasks/:id/status` | Update task status (pending/in-progress/completed) |
| `PATCH` | `/tasks/:id/pin` | Toggle pin status |
| `DELETE` | `/tasks/:id` | Delete a task |

---

## 📸 Screenshots
*(Add screenshots of your Welcome page, Dashboard, and Modals here before submitting!)*

## 🌐 Live Demo
*(Add your deployed Vercel/Render links here!)*

---
*Developed for the Full-Stack Internship Assignment*
