# Resume AI Assistant

A full-stack Generative AI application that lets users interact with a professional resume through a conversational AI interface.

The assistant uses Retrieval-Augmented Generation (RAG), embeddings, vector search, reranking, and an LLM to retrieve relevant resume information and generate concise, context-aware responses.

## 🌐 Live Demo

**Application:** https://tejaspati-ai.web.app

**GitHub Repository:** https://github.com/tejaspatil-web/Resume_Ai_Assistant

---

## ✨ Features

- Conversational AI-powered resume assistant
- Resume-grounded responses using RAG
- Semantic search using text embeddings
- Vector database integration
- Retrieval and reranking of relevant resume content
- Markdown-formatted AI responses
- Copy AI responses
- Regenerate the latest AI response
- Professional dark glassmorphism chat interface
- Responsive UI for desktop and mobile
- Clickable LinkedIn and GitHub profile/project links
- External links open in a new browser tab
- Prompt rules designed to prevent unsupported or fabricated resume information

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Angular 18 UI     │
                         │  Resume Chat Client  │
                         └──────────┬───────────┘
                                    │ HTTP
                                    ▼
                         ┌──────────────────────┐
                         │     Resume AI API    │
                         │       Node.js        │
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴───────────┐
                         ▼                      ▼
                ┌─────────────────┐    ┌─────────────────┐
                │ Query Embedding │    │ Resume Context  │
                └────────┬────────┘    └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  Vector Search  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Reranking    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │       LLM       │
                └────────┬────────┘
                         │
                         ▼
                ┌──────────────────────┐
                │ Resume-based Answer  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Angular Chat UI    │
                └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- Angular 18
- TypeScript
- HTML5
- SCSS
- Angular Signals
- RxJS
- Markdown rendering
- Font Awesome

### Backend

- Node.js
- REST API
- LLM API integration
- Retrieval-Augmented Generation (RAG)
- Embedding generation
- Vector search
- Reranking

### AI / Search

- Large Language Models (LLMs)
- Text embeddings
- Vector database
- Semantic similarity search
- Reranking

### Deployment

- Angular UI: Firebase Hosting
- Backend API: Cloud deployment

---

## 🔄 How It Works

1. The user enters a question in the Angular chat interface.
2. The API generates an embedding for the question.
3. The vector database performs semantic similarity search against resume chunks.
4. Relevant documents are retrieved.
5. Retrieved documents are reranked based on relevance.
6. The most relevant resume context is provided to the LLM.
7. The LLM generates an answer using only the available resume context.
8. The Angular application renders the response as formatted Markdown.

The assistant is designed to remain grounded in the resume context and avoid unsupported assumptions.

---

## 📂 Project Structure

```text
Resume-Ai-Assistant/
│
├── API/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── ...
│
├── UI/
│   ├── src/
│   ├── public/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- Angular CLI
- Configured LLM API
- Configured vector database

### Clone the Repository

```bash
git clone https://github.com/tejaspatil-web/Resume_Ai_Assistant.git
cd Resume_Ai_Assistant
```

---

## ⚙️ Backend Setup

```bash
cd API
npm install
```

Configure the environment variables required by the API.

Example:

```env
PORT=3000
LLM_API_KEY=your_api_key
VECTOR_DB_URL=your_vector_database_url
VECTOR_DB_API_KEY=your_vector_database_key
```

Start the API using the script configured in `API/package.json`:

```bash
npm start
```

For development, use the development script configured in the project:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd UI
npm install
ng serve
```

Open:

```text
http://localhost:4200
```

---

## 📦 Production Build

Build the Angular application:

```bash
ng build --configuration production
```

Production files are generated under:

```text
UI/dist/resume-ai-assistant/browser
```

---

## ☁️ Firebase Deployment

The Angular UI is deployed using Firebase Hosting.

From the UI directory:

```bash
cd UI
ng build --configuration production
firebase deploy --only hosting
```

Live application:

https://tejaspati-ai.web.app

---

## 🔐 Environment Variables

Never commit API keys, database credentials, or other secrets to GitHub.

Recommended `.gitignore` entries:

```gitignore
.env
.env.*
!.env.example
```

Commit only `.env.example` with placeholder values.

Example:

```env
PORT=3000
LLM_API_KEY=
VECTOR_DB_URL=
VECTOR_DB_API_KEY=
```

---

## 🧠 RAG Pipeline

```text
User Question
      ↓
Query Embedding
      ↓
Vector Similarity Search
      ↓
Relevant Resume Chunks
      ↓
Reranking
      ↓
Context Selection
      ↓
LLM
      ↓
Grounded Resume Response
```

The assistant is instructed to:

- Use only the retrieved resume context.
- Avoid inventing professional experience, projects, skills, or other details.
- Clearly state when requested information is unavailable.
- Keep responses professional and concise.
- Provide project GitHub links only when the corresponding link exists in the resume context.

---

## 💬 Example Queries

- Tell me about yourself.
- Summarize your professional experience.
- What technologies do you know?
- Tell me about your projects.
- What AI applications have you built?
- What is your Angular experience?
- Tell me about your AG Grid experience.
- What automation experience do you have?
- What security-related work have you done?
- What is your experience with Node.js?
- Get me your GitHub and LinkedIn profile links.
- Tell me about your Resume AI Assistant project.

---

## 🎨 User Interface

The application provides a modern AI-chat experience with:

- Dark theme
- Glassmorphism-inspired design
- Responsive chat layout
- AI and user avatars
- Markdown responses
- Typing indicator
- Copy response action
- Regenerate latest response
- Smooth scrolling
- Professional hyperlink styling
- External links opening in a new tab

---

## 🔗 Project Links

### Live Application

https://tejaspati-ai.web.app

### GitHub

https://github.com/tejaspatil-web/Resume_Ai_Assistant

### LinkedIn

https://linkedin.com/in/-tejas-patil

---

## 👨‍💻 Author

### Tejas Patil

Software Developer with 3 years of experience in web application development, specializing in Angular, Node.js, ASP.NET Core, AG Grid, automation, and Generative AI applications.

**Areas of expertise:**

- Angular and modern frontend architecture
- Full-stack web development
- REST API development
- AG Grid
- Generative AI
- Retrieval-Augmented Generation
- Vector databases
- Test automation with Playwright
- Enterprise application development

---

## 🚧 Future Enhancements

- Streaming AI responses
- Conversation persistence
- Authentication and user management
- Resume version management
- Resume content administration
- Improved source and citation display
- Hybrid keyword and semantic search
- Advanced reranking strategies
- AI response analytics

---

## 📄 License

This project is intended for portfolio, demonstration, and educational purposes.
