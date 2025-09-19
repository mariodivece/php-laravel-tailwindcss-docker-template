# Single Page Web Application

A modern single-page web application built with Laravel 12, React, TypeScript, and Tailwind CSS v4, containerized with Docker.

## Features

- **Landing Page**: Professional landing page with general information and call-to-action sections
- **Newsletter Subscription**: Email subscription form that saves records to SQLite database
- **Contact Form**: Contact form that sends emails to a predefined address
- **CSV Export API**: Admin API endpoint to download newsletter subscriptions in CSV format
- **Modern Tech Stack**: Laravel 12, React, TypeScript, Tailwind CSS v3
- **Containerized**: Complete Docker setup for easy deployment

## Technology Stack

- **Backend**: PHP 8.2, Laravel 12 with Blade templates
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v3
- **Database**: SQLite
- **Build Tool**: Vite
- **Web Server**: Nginx
- **Container**: Docker with PHP 8.2-FPM

## Prerequisites

- Docker and Docker Compose
- Compatible with WSL2 and Docker Desktop on Windows
- Compatible with Docker Compose on Debian 12

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Configure environment variables**:
   Edit the `.env` file and update the following variables:
   ```env
   APP_KEY=base64:YourAppKeyHere
   ADMIN_TOKEN=your-secure-admin-token
   MAIL_HOST=smtp.gmail.com
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=admin@example.com
   ```

3. **Deploy the application**:
   ```bash
   ./deploy.sh
   ```

4. **Access the application**:
   - Web application: http://localhost:8482
   - Newsletter export API: http://localhost:8482/api/newsletter/export?token=YOUR_ADMIN_TOKEN

## API Endpoints

### Newsletter Export
- **URL**: `/api/newsletter/export`
- **Method**: GET
- **Auth**: Requires `ADMIN_TOKEN` as query parameter or Bearer token
- **Response**: CSV file download with all newsletter subscriptions

Example:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" http://localhost:8482/api/newsletter/export
# or
curl "http://localhost:8482/api/newsletter/export?token=YOUR_ADMIN_TOKEN"
```

### Newsletter Subscription
- **URL**: `/newsletter/subscribe`
- **Method**: POST
- **Body**: `{"email": "user@example.com"}`
- **Response**: JSON with success/error message

### Contact Form
- **URL**: `/contact`
- **Method**: POST
- **Body**: `{"name": "John Doe", "email": "john@example.com", "message": "Hello!"}`
- **Response**: JSON with success/error message

## Development

### Project Structure
```
.
├── app/                    # Laravel application files
├── resources/
│   ├── js/                # React components and TypeScript files
│   ├── css/               # Tailwind CSS files
│   └── views/             # Blade templates
├── database/
│   └── migrations/        # Database migrations
├── docker/                # Docker configuration files
├── public/                # Web root directory
└── docker-compose.yml     # Docker Compose configuration
```

### Key Files
- `deploy.sh` - Deployment script
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Service orchestration
- `vite.config.ts` - Asset build configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Docker Commands

### Start the application:
```bash
docker-compose up -d --force-recreate
```

### Stop the application:
```bash
docker-compose down
```

### View logs:
```bash
docker logs single-page-webapp
```

### Rebuild from scratch:
```bash
./deploy.sh
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| APP_KEY | Laravel application key | Required |
| ADMIN_TOKEN | API access token for CSV export | Required |
| MAIL_HOST | SMTP server host | smtp.gmail.com |
| MAIL_USERNAME | SMTP username | Required for email |
| MAIL_PASSWORD | SMTP password | Required for email |
| CONTACT_EMAIL | Email to receive contact form submissions | admin@example.com |

## Security Features

- CSRF protection on all forms
- Email validation and sanitization
- Admin token authentication for API access
- Secure headers configuration in Nginx
- Environment variable validation

## Production Considerations

- Update `APP_KEY` and `ADMIN_TOKEN` with secure values
- Configure proper SMTP credentials for email functionality
- Set up SSL/TLS termination if needed
- Consider using a reverse proxy for multiple applications
- Monitor logs and set up proper backup for the database

## Troubleshooting

### Container won't start
- Check that `APP_KEY` and `ADMIN_TOKEN` are set in `.env`
- Verify Docker is running and has sufficient resources
- Check logs with `docker logs single-page-webapp`

### Email not working
- Verify SMTP credentials in `.env` file
- Check that your email provider allows app passwords
- For Gmail, enable 2FA and generate an app password

### Database issues
- The SQLite database is automatically created on first run
- Database file is persisted in Docker volume `webapp_database`

## License

This project is open-source software licensed under the [MIT license](LICENSE).

## Development Workflow

### 🔥 Hot Reloading Development Environment

For development with instant file changes and hot module replacement:

```bash
./start-dev.sh
```

This will start:
- **Laravel/PHP**: Auto-reloads on file changes
- **React/TypeScript**: Hot Module Replacement (HMR)
- **Tailwind CSS**: Live CSS updates
- **Vite Dev Server**: Running on port 5173

### 🎯 Development Features

- **Live File Synchronization**: All changes in VS Code are instantly reflected
- **Hot Module Replacement**: React components update without page refresh
- **CSS Live Updates**: Tailwind classes apply immediately
- **PHP Auto-reload**: Laravel changes trigger automatic page refresh
- **Database Persistence**: SQLite database persists between restarts

### 📋 Development Commands

```bash
# Start development environment
./start-dev.sh

# Stop development environment
./stop-dev.sh
# or
docker-compose -f docker-compose.dev.yml down

# View live logs
docker logs single-page-webapp-dev -f

# Access development URLs
# - Application: http://localhost:8915
# - Vite Dev Server: http://localhost:5173
```

### 🛠️ VS Code Integration

1. Open the project folder in VS Code
2. Start the development environment: `./start-dev.sh`
3. Edit any file (PHP, React, CSS, TypeScript)
4. Changes appear instantly in your browser

### 📁 File Watching

The development environment watches for changes in:
- **PHP Files**: `app/`, `routes/`, `config/`, `resources/views/`
- **Frontend Files**: `resources/js/`, `resources/css/`
- **Configuration**: `.env`, Laravel config files

### 🔄 Development vs Production

| Feature | Development (`./start-dev.sh`) | Production (`./deploy.sh`) |
|---------|------------------------------|----------------------------|
| File Changes | ✅ Live reload | ❌ Requires rebuild |
| CSS/JS | ✅ HMR via Vite | ✅ Pre-built assets |
| Caching | ❌ Disabled | ✅ Optimized |
| Debug Mode | ✅ Enabled | ❌ Disabled |
| Performance | 🐌 Development | 🚀 Production |

