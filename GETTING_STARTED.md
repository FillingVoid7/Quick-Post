# 🚀 Quick Start Guide for New Users

This guide explains how anyone can quickly set up and run the Quick Post application using Docker.

## 📋 Prerequisites

Before starting, make sure you have:
- **Docker Desktop** installed and running
- **Git** installed
- **At least 2GB** of free disk space

### Install Docker Desktop
- **Windows**: Download from [Docker Desktop for Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)
- **Mac**: Download from [Docker Desktop for Mac](https://desktop.docker.com/mac/main/amd64/Docker.dmg)
- **Linux**: Follow [Docker Engine installation guide](https://docs.docker.com/engine/install/)

## 🎯 Quick Setup (5 Minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/FillingVoid7/Quick-Post.git
cd Quick-Post
```

### Step 2: Environment Setup
```bash
# Copy the environment template
cp .env.example .env

# Generate a secure session secret (choose one method):

# Method 1: Using Node.js (if installed)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: Using OpenSSL (Linux/Mac)
openssl rand -hex 32

# Method 3: Use online generator
# Visit: https://generate-secret.vercel.app/32
```

**Edit `.env` file and replace the SESSION_SECRET:**
```bash
# Open .env file in your text editor and update:
SESSION_SECRET=your-generated-32-character-secret-here
```

### Step 3: Start the Application
```bash
# Build and start all services
docker-compose up --build -d

# Check if everything is running
docker-compose ps
```

### Step 4: Access the Application
🌐 **Open your browser and visit:**
- **Main App**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

🎉 **That's it! You're ready to start blogging!**

## 📱 Usage Commands

### Daily Operations
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Restart after code changes
docker-compose restart app
```

### Development
```bash
# Rebuild after major changes
docker-compose up --build

# View app logs only
docker-compose logs app

# View Redis logs only
docker-compose logs redis

# Execute commands in app container
docker-compose exec app sh
```

### Troubleshooting
```bash
# Clean restart (removes all data)
docker-compose down -v
docker-compose up --build

# Check container health
docker-compose ps

# Force rebuild everything
docker-compose build --no-cache
```

## 🔧 Common Issues & Solutions

### Issue 1: Port Already in Use
**Error**: `port is already allocated`
**Solution**:
```bash
# Check what's using the port
netstat -tulpn | grep :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Kill the process or change port in docker-compose.yml:
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Issue 2: Docker Not Running
**Error**: `Cannot connect to the Docker daemon`
**Solution**: Start Docker Desktop application

### Issue 3: Permission Denied (Linux/Mac)
**Solution**:
```bash
sudo docker-compose up --build -d
# Or add your user to docker group:
sudo usermod -aG docker $USER
# Then log out and back in
```

### Issue 4: Health Check Fails
**Solution**:
```bash
# Check if app is actually running
curl http://localhost:3000/api/health
# Or visit in browser

# If it works, health check will eventually pass
```

## 🎛️ Configuration Options

### Custom Ports
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Access on port 8080
```

### Redis Password (Optional)
Edit `.env`:
```bash
REDIS_PASSWORD=your-redis-password
```

### Development Mode
Edit `.env`:
```bash
NODE_ENV=development
DEBUG_MODE=true
```

## 📊 What Gets Created

When you run the setup, Docker creates:
- **2 Containers**: Next.js app + Redis database
- **1 Network**: For container communication
- **1 Volume**: For persistent Redis data
- **Health Checks**: Automatic monitoring

## 🌍 Platform-Specific Notes

### Windows Users
- Use PowerShell or Command Prompt
- Docker Desktop must be running
- WSL2 backend recommended

### Mac Users (Apple Silicon)
- Docker Desktop handles ARM/Intel automatically
- No special configuration needed

### Linux Users
- Install Docker Engine + Docker Compose
- May need `sudo` for Docker commands
- Or add user to docker group

## 🚀 Production Deployment

For production deployment on servers:

### Using Docker Compose
```bash
# Set production environment
export NODE_ENV=production

# Use production compose file
docker-compose -f docker-compose.prod.yml up -d
```

### Using Cloud Platforms
- **AWS**: Use ECS or EKS
- **Google Cloud**: Use Cloud Run or GKE
- **Azure**: Use Container Instances or AKS
- **DigitalOcean**: Use App Platform or Droplets

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs**: `docker-compose logs -f`
2. **Verify Docker is running**: `docker --version`
3. **Check ports**: Make sure 3000 is available
4. **Review documentation**: See `DOCKER_SETUP.md` for detailed info
5. **Create an issue**: Visit the [GitHub repository](https://github.com/FillingVoid7/Quick-Post/issues)

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Project Documentation](./DOCKER_SETUP.md)

---

## 🎊 Welcome to Quick Post!

You now have a fully functional blog application running in Docker containers. Start creating your first blog post and explore all the features!

**Happy blogging! ✨**
