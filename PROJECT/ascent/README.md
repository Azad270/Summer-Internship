# ASCENT: Track. Rise. Repeat.

> **Live Deployment:** [https://ascent-frontend-xi.vercel.app](https://ascent-frontend-xi.vercel.app)

Ascent is a full-stack MERN habit-tracking application featuring a sci-fi cyber-themed interface, designed for secure user authentication and disciplined daily habit management.

## Technical Architecture

**Frontend:**
* React.js (Vite)
* Hosting: Vercel

**Backend:**
* Node.js & Express.js API
* Database: MongoDB & Mongoose ODM
* Authentication: JWT-based sessions
* Hosting: Render 

##  Key Features
* **User Authentication:** Secure registration and login flows with non-blocking error handling.
* **Habit Management:** Core CRUD operations to track daily progress synced with the database.

##  Local Development Setup

### Prerequisites
* Node.js (v18+)
* MongoDB instance

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/Azad270/Summer-Internship.git
cd PROJECT
cd ascent
\`\`\`

### 2. Environment Variables
Create a `.env` file in your frontend root:
\`\`\`env
VITE_API_URL=https://ascent-backend-ytoi.onrender.com/api
\`\`\`

### 3. Installation & Execution
\`\`\`bash
npm install
npm run dev
\`\`\`
