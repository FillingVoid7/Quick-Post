# Quick Post

A simple blog application built with Next.js, TypeScript, and Redis.

## Features

- 📝 Create and publish blog posts
- 👀 View all blog posts on the homepage
- ✏️ Edit your own blog posts
- 🗑️ Delete your own blog posts
- 🔐 User authentication (login/logout)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: Redis (with ioredis)
- **Authentication**: Iron Session
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

1. **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Clone and start**:
   ```bash
   git clone https://github.com/FillingVoid7/Quick-Post.git
   cd Quick-Post
   cp .env.example .env
   # Edit .env and add your SESSION_SECRET (see GETTING_STARTED.md)
   docker-compose up --build -d
   ```

3. **Access the app**: http://localhost:3000

📖 **New to the project?** See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed setup instructions.

### 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Redis:**
   - Make sure you have Redis running locally or configure your Redis connection

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000]


### Production Notes

- The app includes health checks at `/api/health`
- Redis data is persisted using Docker volumes
- Environment variables are configurable via `.env` file
- Multi-stage Docker build optimizes image size
- Includes wait script to prevent Redis connection issues





