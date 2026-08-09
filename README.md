# Resume AI Assistant

A full-stack GenAI-powered Resume AI Assistant that answers questions about a professional resume using Retrieval-Augmented Generation (RAG), vector search, and LLM APIs.

The application provides a conversational chat interface where users can explore professional experience, technical skills, projects, AI experience, and other resume information.

## ✨ Features

- 💬 Conversational AI resume assistant
- 📄 Answers based only on the provided resume context
- 🔎 Retrieval-Augmented Generation (RAG)
- 🧠 Vector-based semantic search
- 🔗 Project GitHub links when available in the resume context
- 📝 Markdown-formatted AI responses
- 📋 Copy AI responses
- 🔄 Regenerate the latest response
- ⚡ Responsive modern chat UI
- 🪟 Glassmorphism-inspired interface
- 🌐 External links open in a new browser tab
- 🛡️ Prevents the AI from inventing resume information

## 🏗️ Project Structure

```text
resume-ai-assistant/
│
├── API/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
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

## 🛠️ Tech Stack

### Frontend

- Angular 18
- TypeScript
- HTML
- SCSS
- Angular Signals
- RxJS
- Markdown rendering

### Backend

- Node.js
- REST APIs
- LLM API integration
- Retrieval-Augmented Generation (RAG)

### AI / Search

- Large Language Models (LLMs)
- Text embeddings
- Vector database
- Semantic similarity search
- Reranking

## 🔄 Application Flow

```text
User
  │
  ▼
Angular UI
  │
  ▼
Resume AI API
  │
  ├── Generate Query Embedding
  │
  ├── Vector Search
  │
  ├── Retrieve Relevant Resume Chunks
  │
  ├── Rerank Retrieved Content
  │
  ▼
LLM
  │
  ▼
Resume-based Answer
  │
  ▼
Angular Chat UI
```

## 💬 Example Questions

You can ask questions such as:

- Tell me about yourself.
- Summarize your professional experience.
- What technologies do you know?
- Tell me about your projects.
- What AI applications have you built?
- What is your experience with Angular?
- What is your experience with AG Grid?
- Tell me about your automation experience.
- What security-related work have you done?
- Get me your GitHub and LinkedIn profile links.

## 📁 API Setup

Navigate to the API directory:

```bash
cd API
npm install
```

Create your environment configuration based on the environment variables required by the API.

Example:

```env
PORT=3000

# LLM configuration
LLM_API_KEY=your_api_key

# Vector database configuration
VECTOR_DB_URL=your_vector_database_url
VECTOR_DB_API_KEY=your_vector_database_key
```

Start the API:

```bash
npm start
```

> Use the scripts defined in `API/package.json` if your project uses a different development/start command.

## 🎨 UI Setup

Navigate to the UI directory:

```bash
cd UI
npm install
```

Start the Angular application:

```bash
ng serve
```

The application will normally be available at:

```text
http://localhost:4200
```

## 🔐 Environment Variables

Do not commit secrets or API keys to GitHub.

Add environment files to `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

Recommended approach:

```text
.env
.env.example
```

Commit only `.env.example` with placeholder values.

## 🧠 RAG Approach

The assistant is designed to answer questions using resume information retrieved from the vector database.

The general process is:

1. User asks a question.
2. The question is converted into an embedding.
3. Similar resume chunks are retrieved from the vector database.
4. Retrieved chunks are reranked for relevance.
5. Relevant context is provided to the LLM.
6. The LLM generates an answer using the retrieved resume context.
7. The answer is rendered as Markdown in the Angular UI.

The assistant is instructed not to invent information that is not present in the resume context.

## 🔗 Project Links

When a project has a GitHub repository available in the resume context, the assistant can provide the repository as a clickable Markdown link.

Example:

```markdown
[View Project on GitHub](https://github.com/username/repository)
```

Links are configured to open in a new browser tab.

## 🖥️ UI Highlights

The UI is designed as a modern AI-chat experience with:

- Dark theme
- Glassmorphism effects
- Responsive chat layout
- AI and user avatars
- Markdown rendering
- Typing indicator
- Message actions
- Smooth scrolling
- Professional link styling

## 🚀 Future Improvements

Potential improvements include:

- Streaming LLM responses
- Conversation persistence
- Authentication
- Resume version management
- Admin interface for updating resume content
- Improved citation/source display
- Advanced semantic and hybrid search
- More sophisticated reranking
- Analytics for frequently asked resume questions

## 👨‍💻 Author

**Tejas Patil**

Software Developer with experience in scalable web application development, Angular, Node.js, ASP.NET Core, AG Grid, automation, and Generative AI applications.

- LinkedIn: https://linkedin.com/in/-tejas-patil
- GitHub: https://github.com/tejaspati-web

## 📄 License

This project is intended for portfolio and demonstration purposes.
