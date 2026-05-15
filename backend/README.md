# RAGify Backend Documentation

## 📌 Welcome!

This backend is the brains behind RAGify! It uses AI to let you chat with your PDF documents. Don't worry if you're new to this—we'll explain everything simply!

---

## 🏗️ Backend Structure (Folder Layout)

First, let's look at how everything is organized:

```
backend/
├── app/                          # Main application code (this is where most things live!)
│   ├── api/                      # API endpoints (the "doors" the frontend uses to talk to us)
│   │   └── v1/
│   │       ├── health.py         # Checks if backend is running
│   │       ├── upload.py         # Handles PDF file uploads
│   │       ├── query.py          # Handles chat questions
│   │       └── clear.py          # Cleans up uploaded custom documents
│   │
│   ├── core/                     # Core settings and configuration
│   │   ├── config.py             # Reads environment variables (like your API keys)
│   │   ├── logging.py            # Sets up logging (so we can see what's happening)
│   │   └── observability.py      # Optional: LangSmith for monitoring
│   │
│   ├── models/                   # Data schemas (what shape data should be)
│   │   ├── requests.py           # What incoming requests look like
│   │   └── responses.py          # What outgoing responses look like
│   │
│   ├── pipelines/                # The RAG pipeline! (the magic behind the scenes)
│   │   ├── loader.py             # Reads text from PDFs
│   │   ├── splitter.py           # Splits text into smaller chunks
│   │   ├── embeddings.py         # Turns text into numbers (vectors) that AI understands
│   │   ├── vector_store.py       # Stores the number vectors in a database
│   │   ├── retriever.py          # Finds relevant text chunks for questions
│   │   └── llm_chain.py          # Creates the AI response chain
│   │
│   ├── services/                 # Business logic (the "workers" that do the real work)
│   │   ├── document_service.py   # Handles document uploads, processing, and storage
│   │   └── query_service.py      # Handles chat questions and AI responses
│   │
│   ├── utils/                    # Helpful little tools
│   │   ├── file_handling.py      # Saves and manages uploaded files
│   │   └── logging_utils.py      # Logs when the app starts
│   │
│   └── main.py                   # The entry point! Starts the whole backend!
│
├── temp/                         # Temporary storage for uploaded files
│   ├── uploads/                  # Where PDFs are saved temporarily
│   └── processed/                # Placeholder for processed files
│
├── tests/                        # Automated tests (to make sure everything works!)
│
├── requirements.txt              # List of all Python packages we need
├── runtime.txt                   # Tells Render which Python version to use
├── .env.example                  # Example environment variables (copy to .env and edit!)
└── render.yaml                   # Configuration for deploying to Render
```

---

## 🚀 Getting Started (How to Run the Backend)

### Step 1: Install Python
Make sure you have Python 3.11 or later installed on your computer.

### Step 2: Create a Virtual Environment
Virtual environments keep our project's dependencies separate from other projects!

**Windows**:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

You'll see `(venv)` at the start of your terminal prompt—this means it's working!

### Step 3: Install Dependencies
Install all the packages we need:
```bash
pip install -r requirements.txt
```

### Step 4: Set Up Environment Variables
Copy the example env file and edit it:
```bash
cp .env.example .env
```
Now open the `.env` file in a text editor and add your **GROQ_API_KEY** (get one from https://console.groq.com/).

### Step 5: Run the Backend!
```bash
uvicorn app.main:app --reload
```

The `--reload` flag means it will automatically restart if you change any code—great for development!

You should see something like:
```
INFO: Uvicorn running on http://0.0.0.0:8000
```

Visit **http://localhost:8000/docs** in your browser to see the interactive API documentation (Swagger UI)!

---

## 🧠 The RAG Pipeline Explained (Simply!)

**RAG** = Retrieval‑Augmented Generation. It's how we make AI use *your* documents instead of just general knowledge!

Here's what happens, step by step:

### 1. Upload Documents
- You send PDFs to `/api/v1/upload`
- We save them temporarily in `temp/uploads/`

### 2. Load Text from PDFs
- **File**: `app/pipelines/loader.py`
- We use a tool called PyPDFLoader to read all the text from your PDFs

### 3. Split Text into Chunks
- **File**: `app/pipelines/splitter.py`
- PDFs can be huge! AI can't read the whole thing at once.
- So we split the text into smaller pieces (chunks):
  - **CHUNK_SIZE**: 1500 (each chunk has ~1500 words/tokens)
  - **CHUNK_OVERLAP**: 100 (chunks overlap a little so we don't lose context)

### 4. Create Embeddings
- **File**: `app/pipelines/embeddings.py`
- Embeddings are just numbers that represent the *meaning* of text!
- Similar text has similar numbers—this is how AI finds relevant info!
- We use HuggingFace's all-MiniLM-L6-v2 model (it's free and works great!)

### 5. Store in Vector Database
- **File**: `app/pipelines/vector_store.py`
- We use **ChromaDB** (a lightweight vector database)
- Each RAG type gets its own collection to keep things separate:
  - `ragify_financial` → only financial docs
  - `ragify_legal` → only legal docs
  - `ragify_custom` → your uploaded docs

### 6. Ask a Question (Retrieval + Generation)
- **File**: `app/pipelines/retriever.py` and `app/pipelines/llm_chain.py`
1. **Retrieval**: We find the most relevant chunks from your documents using the embeddings
2. **Generation**: We send those chunks + your question to Groq's LLM
3. **Streaming**: The AI response comes back token by token (like ChatGPT!)

---

## 🔌 API Endpoints (What the Frontend Uses)

All endpoints start with `/api/v1`!

### 1. Health Check
- **URL**: `GET /api/v1/health`
- **What it does**: Checks if backend is alive and healthy
- **Response**: `{"status": "healthy"}`

### 2. Upload Documents
- **URL**: `POST /api/v1/upload`
- **What it does**: Accepts PDF files, processes them into a vector store
- **Parameters**:
  - `files`: List of PDF files (required)
  - `rag_type`: Which RAG mode? "custom" (default), "financial", or "legal" (optional)
- **Response**:
  ```json
  {
    "total_files": 2,
    "total_pages": 50,
    "total_chunks": 120,
    "message": "Documents processed successfully"
  }
  ```

### 3. Ask a Question (Streamed)
- **URL**: `POST /api/v1/query`
- **What it does**: Sends your question to AI, returns a streaming response
- **Request Body**:
  ```json
  {
    "question": "What are the key financial risks?",
    "session_id": "default",
    "rag_type": "financial"
  }
  ```
- **Response**: Streams text back token by token!

### 4. Clear Custom Documents
- **URL**: `POST /api/v1/clear-custom`
- **What it does**: Deletes your uploaded custom documents, clears the vector store and chat memory
- **Response**: `{"message": "Custom documents cleared"}`

---

## 🛠️ Key Files Explained

Let's look at the most important files in detail!

---

### 📄 app/main.py (The Entry Point)
This is the first file that runs when you start the backend!

**What it does**:
1. Creates a FastAPI app
2. Sets up CORS so the frontend can talk to us (from any domain)
3. Registers all our API endpoints
4. Loads the demo Financial and Legal RAGs on startup
5. Logs that the app is running

---

### 📄 app/services/document_service.py (Document Manager)
This is the "office manager" for all document operations!

**Key things it does**:
- Keeps track of vector stores in `DocumentService.vector_stores` dictionary:
  ```python
  vector_stores = {
      "financial": ChromaVectorStore,
      "legal": ChromaVectorStore,
      "custom": ChromaVectorStore
  }
  ```
- Keeps track of uploaded custom files in `DocumentService.uploaded_custom_files`
- `upload_documents()`: Processes new PDFs
- `load_demo_documents()`: Loads the pre‑existing Financial and Legal demo docs on app startup
- `clear_custom_documents()`: Cleans up everything when user is done with custom docs

---

### 📄 app/services/query_service.py (Chat Manager)
This handles all the chat and AI response logic!

**Key things it does**:
- `stream_answer()`: The main function that generates AI answers
- Uses `RunnableWithMessageHistory` to remember chat history
- **Session Isolation**: Chat memory is kept separate per RAG type using session IDs like `financial_default`, `legal_default`, `custom_default`
- Creates a fresh retriever every time from `DocumentService.vector_stores[rag_type]` (no caching, always fresh!)

---

### 📄 app/pipelines/vector_store.py (Vector Database)
Creates our ChromaDB vector store!

**Important**: We use **unique collection names per rag_type** to prevent cross‑contamination!
- `ragify_financial`, `ragify_legal`, `ragify_custom`

---

## 🔒 Isolation (No Cross‑Contamination!)

We make sure Financial, Legal, and Custom RAGs never mix!

### 1. Vector Isolation
Each RAG type has its own Chroma collection: `ragify_{rag_type}`

### 2. Session Isolation
Chat memory keys are prefixed: `{rag_type}_{session_id}` (e.g., `financial_default`)

### 3. No Caching
Every `stream_answer` call creates a brand new retriever from `DocumentService.vector_stores[rag_type]`—no stale data!

---

## 🧪 Running Tests

We have automated tests to make sure everything works!

Run all tests:
```bash
python -m pytest tests/ -v
```

---

## 🚀 Deployment

We use **Render** to deploy the backend! The `render.yaml` file already has everything configured!

Just:
1. Push your code to GitHub
2. Go to Render → New Web Service
3. Connect your repo
4. The config from `render.yaml` will auto‑load!
5. Add your GROQ_API_KEY as a secret environment variable
6. Deploy! 🎉

---

## 📚 Key Terms (Glossary)

| Term | What it means in simple words |
|------|--------------------------------|
| **RAG** | Retrieval‑Augmented Generation—AI uses *your docs* to answer |
| **Embedding** | Numbers that represent the *meaning* of text |
| **Vector Store / Vector DB** | Database that stores embeddings (ChromaDB) |
| **Chunk** | Small piece of a document |
| **LLM** | Large Language Model—the AI that generates responses (Groq) |
| **Streaming** | AI response comes word by word (like ChatGPT) |
| **CORS** | Lets frontend on one domain talk to backend on another |
| **API Endpoint** | A URL the frontend calls to get things done |

---

## 💡 Tips for Beginners

1. **Use the Swagger UI**: Visit http://localhost:8000/docs to test endpoints directly in your browser!
2. **Check Logs**: The terminal will show you what's happening—great for debugging!
3. **Virtual Environment**: Always activate `venv` before working on the backend!
4. **Environment Variables**: Never commit `.env` to git (it has your secrets!)

---

## 🎉 That's It!

You now understand how the entire RAGify backend works! If you have questions, just look at the code—each file is well‑organized and does one simple thing!

Happy coding! 🚀
