# ✨ Taskflow AI 🤖

**Instantly convert your thoughts and notes into a structured workflow using the power of Google's Gemini AI.**

Taskflow AI is a modern, AI-first task management application built on the MERN stack. It's designed to fundamentally change how you work by seamlessly transforming unstructured, natural language—from personal reminders to detailed meeting minutes—into a perfectly organized and actionable task list. Stop organizing, start executing.

---

## 🚀 Core Capabilities

- **Natural Language Processing:** Leverages Google's Gemini AI to understand and process your text inputs.
- **Intelligent Data Extraction:** Automatically identifies task details, including assignees, priorities, and deadlines.
- **Document-to-Task Conversion:** Upload meeting notes or any text document to generate a task list in seconds.
- **Context-Aware Analysis:** The AI understands the relationships between tasks, creating a coherent workflow.
- **Full Task Management Suite:** Provides complete CRUD (Create, Read, Update, Delete) functionality with status tracking.
- **Secure User Authentication:** Protects your data with a robust system using JWT and password hashing.

## 🛠️ The Tech Stack

Taskflow AI is built with a modern, powerful, and scalable technology stack.

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Zustand
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Artificial Intelligence:** Google Generative AI (Gemini)

## 🏁 Getting Started: A Step-by-Step Guide

Follow these steps to get a local instance of Taskflow AI up and running.

### 1. Prerequisites

Ensure you have the following installed on your system:

- Node.js (v18 or newer)
- MongoDB (A local instance or a connection string from MongoDB Atlas)
- A Google Gemini API Key

> **Note**: You can obtain your free Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Installation & Configuration

First, clone the repository and install the necessary dependencies for both the client and server.

```bash
# Clone the repository
git clone <repository-url>
cd taskflow-ai

# Navigate to the server directory and install dependencies
cd server
npm install

# Navigate to the client directory and install dependencies
cd ../client
npm install
```

Next, create a `.env` file in the `server` directory and populate it with your credentials.
**`server/.env`:**

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskflowai
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Launching the Application

You'll need two separate terminal windows to run the application.

```bash
# In your first terminal, start the backend server
cd server
npm run dev
```

```bash
# In your second terminal, start the frontend client
cd client
npm run dev
```

Once running, the application will be available at:

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5001`

---

## 🤖 See It In Action: Real-World Scenarios

Here’s how Taskflow AI handles various text inputs.

### Scenario 1: IT Team Coordination

**Input:**

```
"Okay team, for today's sprint: Rohan, please finish the API integration for the payment gateway. Ananya, you need to start testing the new user authentication flow, this is a high priority task. I'll handle the client call with Mr. Gupta at 3 PM IST. Priya also needs to deploy the latest build to the staging server by end of day today, June 13th."
```

**AI Output:**

- **Task:** Finish API integration for payment gateway (_Assignee: Rohan_)
- **Task:** Start testing new user authentication flow (_Assignee: Ananya, Priority: High_)
- **Task:** Client call with Mr. Gupta (_Time: 3:00 PM IST_)
- **Task:** Deploy latest build to staging server (_Assignee: Priya, Due Date: June 13, 2025_)

### Scenario 2: Planning a Marketing Campaign

**Input:**

```
"For the upcoming Diwali campaign: Vikram, get the final creatives for social media banners by next Monday. Aisha, please write a blog post on 'Top 10 Diwali Gift Ideas' and schedule it for Wednesday. Sameer, you have to follow up with the print vendor in Karol Bagh about our brochures tomorrow."
```

**AI Output:**

- **Task:** Get final creatives for social media banners (_Assignee: Vikram, Due Date: June 16, 2025_)
- **Task:** Write a blog post on 'Top 10 Diwali Gift Ideas' (_Assignee: Aisha_)
- **Task:** Schedule blog post (_Assignee: Aisha, Due Date: June 18, 2025_)
- **Task:** Follow up with print vendor in Karol Bagh (_Assignee: Sameer, Due Date: June 14, 2025_)

### Scenario 3: A Personal To-Do List

**Input:**

```
"My reminders: I need to pay the electricity bill before the 20th of June. Also, buy groceries from the local market this evening. I have to schedule a doctor's appointment for my father for sometime next week. Most importantly, I must finish the quarterly sales report by tomorrow EOD."
```

**AI Output:**

- **Task:** Pay the electricity bill (_Due Date: June 20, 2025_)
- **Task:** Buy groceries from the local market (_Time: This evening_)
- **Task:** Schedule a doctor's appointment for my father (_Due Date: Next week_)
- **Task:** Finish the quarterly sales report (_Priority: High, Due Date: June 14, 2025_)

---

## 💡 The Core Workflow

The process from thought to task is simple and intuitive.

1.  **Input Your Text:** Type, paste, or upload any text that contains your to-do items.
2.  **Let AI Process:** In seconds, Gemini AI reads and understands your text, extracting key details.
3.  **Manage Your Tasks:** Your structured tasks appear on the dashboard, ready for you to edit, track, and complete.
4.  **Stay Organized:** Let the AI handle the organization with automatic context, priorities, and deadlines.

---

**Crafted with the MERN stack and Google Gemini AI.**
