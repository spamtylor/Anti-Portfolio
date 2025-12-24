# 🪦 The Anti-Portfolio

> "A monument to abandoned code."

## The Vibe

This is a **Brutalist 3D Graveyard** for your unfinished GitHub repositories. Instead of hiding your failures, we celebrate them as stepping stones.
Each floating tombstone represents a repo that hasn't been touched in months.

## Tech Stack

- **Framework**: Next.js 14 (Stable)
- **3D Engine**: React Three Fiber (R3F) + Drei
- **Styling**: Tailwind CSS
- **Data**: GitHub API (Octokit)
- **Generative**: Vercel AI SDK (Gemini)

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:

   ```env
   GITHUB_TOKEN=your_token_here
   GEMINI_API_KEY=your_key_here
   NEXT_PUBLIC_USERNAME=your_username
   ```

3. **Run**
   ```bash
   npm run dev
   ```

## Structure

- `/src/components/canvas`: The R3F 3D world (Tombstones, Scene).
- `/src/components/overlay`: The HTML UI overlay (Epitaphs, Nav).
- `/src/lib`: Logic for GitHub fetching and AI generation.
- `/docs`: Project Documentation (SPEC, DESIGN, etc.) based on the Foundation Template.

## Documentation

This project uses the **Project Foundation Template**. See `PROJECT_FOUNDATION.md` for details on the structure and workflows.
