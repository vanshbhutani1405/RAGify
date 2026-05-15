# RAGify Frontend Documentation

## 📌 Welcome!

This is the beautiful, modern frontend for RAGify! It's built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Even if you're new to frontend development, this guide will explain everything simply!

---

## 🏗️ Frontend Structure (Folder Layout)

Here's how everything is organized:

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router (pages)
│   │   ├── layout.tsx                # Root layout (applies to all pages)
│   │   ├── page.tsx                  # Landing page (home)
│   │   ├── globals.css               # Global styles, Tailwind setup, CSS variables
│   │   └── app/
│   │       ├── layout.tsx            # Layout for /app route
│   │       └── page.tsx              # Main chat room page
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── sections/                 # Landing page sections
│   │   │   ├── Hero.tsx              # Hero section with animated background
│   │   │   ├── WhyRagify.tsx        # Why RAGify section
│   │   │   ├── Features.tsx          # Features grid
│   │   │   ├── UseCases.tsx          # Use cases cards
│   │   │   ├── CustomRag.tsx         # Custom RAG section
│   │   │   ├── HowItWorks.tsx        # How it works steps
│   │   │   ├── Stats.tsx             # Stats section
│   │   │   ├── FAQ.tsx               # FAQ accordion
│   │   │   └── Footer.tsx            # Footer
│   │   │
│   │   ├── app/                      # Chat room components
│   │   │   ├── Sidebar.tsx           # Desktop sidebar (hidden on mobile)
│   │   │   ├── UploadArea.tsx        # Upload and demo RAG selection
│   │   │   └── ChatInterface.tsx     # Chat interface with messages and input
│   │   │
│   │   └── ui/                       # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ... (other UI components)
│   │
│   └── lib/                          # Utilities and helpers
│       ├── api.ts                    # API calls to backend
│       └── utils.ts                  # Helper functions (cn for Tailwind classes)
│
├── public/                           # Static assets
│
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind configuration
├── next.config.mjs                   # Next.js configuration
├── .env.example                      # Example environment variables
└── vercel.json                       # Vercel deployment config
```

---

## 🚀 Getting Started (How to Run the Frontend)

### Step 1: Install Node.js
Make sure you have Node.js 18 or later installed.

### Step 2: Install Dependencies
```bash
cd frontend
npm install
```

### Step 3: Set Up Environment Variables
Copy the example file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

(If your backend is deployed, use that URL instead!)

### Step 4: Run the Frontend!
```bash
npm run dev
```

Visit **http://localhost:3000** in your browser!

---

## 🎨 Design System

We use a beautiful dark theme with glassmorphism! Here are our main colors:

| Color | CSS Variable | What it's used for |
|-------|--------------|---------------------|
| Background | `--background` | Main page background |
| Foreground | `--foreground` | Main text color |
| Primary | `--primary` | Buttons, highlights, icons |
| Secondary | `--secondary` | Secondary buttons, cards |
| Muted | `--muted` | Subtle text, backgrounds |
| Border | `--border` | Borders, dividers |

All colors are defined in `src/app/globals.css`!

---

## 📱 Pages Overview

### 1. Landing Page (`src/app/page.tsx`)
The beautiful home page users see first!

Sections included:
- **Hero**: Animated background, headline, subheadline, CTA buttons
- **Why RAGify**: Explains what RAG is
- **Features**: 6 feature cards with icons
- **Use Cases**: 6 use‑case cards (Financial, Legal, etc.)
- **Custom RAG**: Build any custom RAG system
- **How It Works**: 5‑step process
- **Stats**: Animated stats
- **FAQ**: Collapsible accordion
- **Footer**: Company info and social links

### 2. Chat Room (`src/app/app/page.tsx`)
The main application where users chat with documents!

Layout:
- **Desktop**: Sidebar + Upload area + Large chat area
- **Mobile**: No sidebar, toggle between Upload and Chat views

State management:
- `uploadedFiles`: Tracks user‑uploaded PDFs
- `currentRagType`: Which mode? "financial", "legal", or "custom"
- `isProcessing`: Is something loading?
- `showChatOnMobile`: Should we show chat on mobile?

---

## 🧩 Key Components

Let's look at the most important components!

---

### 1. `src/components/app/UploadArea.tsx`
Handles document upload and demo RAG selection!

**Features**:
- Drag‑and‑drop multi‑PDF upload
- File type validation (only PDFs allowed)
- Upload progress visualization
- AI processing steps (extracting → splitting → embedding → etc.)
- Demo RAG buttons (Financial, Legal)
- RAG description subtitle
- File list after upload

---

### 2. `src/components/app/ChatInterface.tsx`
The chat interface!

**Features**:
- ChatGPT‑style message bubbles
- Streaming AI responses (token by token)
- Markdown rendering (headings, lists, code blocks)
- Typing indicator
- Suggested question prompts
- Error handling
- Sticky input at bottom (always visible!)
- Auto‑scroll to bottom on new messages

**State**:
- `messages`: Array of chat messages
- `input`: Current text in input field
- `isTyping`: Is AI responding?
- `error`: Any error message

---

### 3. `src/lib/api.ts`
All our API calls to the backend!

**Functions**:
- `uploadDocuments(files, ragType)`: Uploads PDFs
- `streamQuery(question, sessionId, ragType)`: Sends question, returns streaming response
- `clearCustomDocuments()`: Clears uploaded custom docs

**Environment Variable**:
- Uses `NEXT_PUBLIC_API_URL` to know where the backend is

---

## 📱 Responsive Design

The app works perfectly on all screen sizes!

### Desktop
- Full 3‑panel layout: Sidebar + Upload + Chat
- Chat area is largest (~70% of space)

### Mobile
- No sidebar
- Toggle between Upload view and Chat view
- Chat input always visible at bottom
- Uses `dvh` (dynamic viewport height) to handle mobile browser address bars

---

## 🎬 Animations

We use **Framer Motion** for beautiful, smooth animations!

Examples:
- Hero section floating elements
- Section fade‑ins as you scroll
- Chat message slide‑ups
- Button hover effects
- Processing step animations

All animations are subtle and professional—not too distracting!

---

## 🔌 Connecting to Backend

We talk to the backend using these endpoints:

1. **POST /api/v1/upload** → Upload PDFs
2. **POST /api/v1/query** → Ask questions (streaming)
3. **POST /api/v1/clear-custom** → Clear custom docs

All in `src/lib/api.ts`!

---

## 🚀 Deployment

We use **Vercel** for frontend deployment—it's super easy!

Steps:
1. Push code to GitHub
2. Go to Vercel → Add New Project
3. Import your repo
4. Set **Root Directory**: `frontend`
5. Add environment variable: `NEXT_PUBLIC_API_URL` (your Render backend URL)
6. Deploy! 🎉

The `vercel.json` file already has the configuration!

---

## 📚 Key Terms (Glossary)

| Term | What it means |
|------|----------------|
| **Next.js** | React framework we use (App Router) |
| **TypeScript** | Type‑safe JavaScript |
| **Tailwind CSS** | Utility‑first CSS (we write classes instead of CSS files) |
| **Framer Motion** | Animation library |
| **Shadcn UI** | Beautiful, accessible UI components |
| **Lucide React** | Icons we use |
| **Markdown** | Simple way to format text (headings, lists, code) |
| **Streaming** | AI response comes word by word (like ChatGPT) |
| **Glassmorphism** | Frosted glass effect on cards |

---

## 💡 Tips for Beginners

1. **Use the Dev Tools**: Right‑click → Inspect to see what's happening!
2. **Tailwind Docs**: https://tailwindcss.com/docs is your best friend!
3. **Component Reusability**: We make small, reusable components—follow that pattern!
4. **TypeScript**: Always use types! It catches bugs early!

---

## 🎉 That's It!

You now understand the entire RAGify frontend! The code is clean, well‑organized, and follows modern best practices!

Happy coding! 🚀
