# RAGify

<div align="center">
  <h1>🤖 Turn Documents Into Conversations</h1>
  <p>A modern, production-grade AI-powered multi-document research assistant built with Retrieval-Augmented Generation (RAG)</p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/FastAPI-0.115-teal?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/LangChain-green?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-blue?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  </p>
</div>

## 🚀 Key Features

- **Multi-Document Upload**: Upload multiple PDFs and chat with your documents
- **Conversational Memory**: Remember context across chat turns
- **Streaming AI Responses**: Token-by-token streaming like ChatGPT
- **Semantic Search**: Context-aware retrieval using RAG
- **Preloaded Demo RAGs**: Instantly try Financial and Legal RAG modes
- **Beautiful UI/UX**: Modern dark theme, glassmorphism, smooth animations
- **Mobile-First Design**: Perfect responsive layout on all devices
- **Clean Architecture**: Scalable, maintainable codebase

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Markdown** - Rich markdown rendering
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Modern, high-performance web framework
- **LangChain** - Orchestration for LLM applications
- **ChromaDB** - Vector database for embeddings
- **HuggingFace Embeddings** - Open-source text embeddings
- **Groq** - Blazing-fast LLM inference
- **Uvicorn** - ASGI server

## 📸 Demo

### Landing Page
- Hero section with animated background
- Features, Use Cases, How It Works sections
- Stats, FAQ, Footer

### Chat Interface
- Split-layout: Upload sidebar + Large chat area
- Drag-and-drop multi-document upload
- AI processing visualization (extract → split → embed → vectorize)
- ChatGPT-style streaming responses
- Suggested question prompts
- Source citations
- Mobile-friendly with no sidebar

## 🏗️ Architecture

### Project Structure
```
RAGify/
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utilities and API
│   └── package.json
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── pipelines/      # RAG pipeline (embeddings, vector store)
│   │   ├── services/       # Business logic
│   │   └── models/         # Pydantic schemas
│   └── requirements.txt
└── render.yaml             # Render backend deployment config
```

### RAG Pipeline
1. **Document Loading**: Extract text from uploaded PDFs
2. **Text Splitting**: Split into chunks (1500 tokens, 100 overlap)
3. **Embedding Creation**: Generate semantic embeddings
4. **Vector Storage**: Store in ChromaDB with unique collections per RAG type
5. **Retrieval**: Semantic search to find relevant chunks
6. **Generation**: Stream AI responses using retrieved context

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Groq API key

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your GROQ_API_KEY
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

## 🌐 Deployment

### Frontend on Vercel
1. Push repo to GitHub
2. Import to Vercel
3. Set root directory: `frontend`
4. Add env var: `NEXT_PUBLIC_API_URL` (your Render backend URL)
5. Deploy!

### Backend on Render
1. Push repo to GitHub
2. New Web Service → Connect repo
3. Configure:
   - Root Directory: `backend`
   - Runtime: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
4. Add env var: `GROQ_API_KEY` (as secret)
5. Deploy!

## ✨ Key Technical Highlights

- **Type-Safe End-to-End**: TypeScript frontend + Pydantic schemas
- **Vector Isolation**: Unique Chroma collections per RAG mode (no cross-contamination)
- **Session Isolation**: Per-RAG-type chat memory
- **Streaming Responses**: FastAPI StreamingResponse + async generators
- **Production-Ready**: Clean architecture, error handling, environment variables
- **Optimized Performance**: Larger chunk sizes, smaller overlaps, in-memory Chroma

## 📄 License

MIT

---

<div align="center">
  <h3>Built with ❤️ and AI</h3>
  <p>This project demonstrates modern full-stack development with AI, production-ready architecture, and exceptional UI/UX.</p>
</div>
