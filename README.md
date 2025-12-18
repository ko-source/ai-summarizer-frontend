## AI Summarizer – Frontend (Next.js)

A Next.js React frontend for signing in, managing summaries, and viewing AI-generated results.

### 1. Prerequisites

- **Node.js & npm**: Install the latest LTS version from the official site.
- Make sure the **backend API** is running and you know its base URL.

### 2. Install dependencies
```bash
cd ai-summarizer-frontend
npm install
```

### 3. Configure environment
- **Create a `.env.local` file** in the project root.
- Add your API base URL (adjust the port if your backend uses a different one):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the frontend (development)
```bash
npm run dev
```
Open `http://localhost:3000` in your browser to view the app.


After completing these steps, you should be able to sign in, create summaries, and interact with the AI summarizer through the UI.