# HTTFF Auth System

A complete authentication system with API key management and audit logging for `https://httff.com`.

## Features

✅ **User Management**
- User registration with email validation
- Secure password hashing with bcrypt
- User profile management

✅ **Authentication**
- JWT-based authentication
- Secure login/logout
- Session management

✅ **API Keys**
- Generate API keys
- Revoke/manage API keys
- API key validation
- Key expiration support

✅ **Activity Logging**
- Comprehensive audit logs
- Track all user actions (login, logout, API key creation, etc.)
- IP address and user agent tracking
- Activity statistics

## Tech Stack

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Database
- **Flask-SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **bcrypt** - Password hashing
- **Flask-CORS** - CORS support

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript** - Client-side logic

## Quick Start

### Using Docker (Recommended)
```bash
git clone https://github.com/htt2852011-blip/httff-auth-system.git
cd httff-auth-system
docker-compose up -d
```

### Manual Setup
```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
python -m http.server 3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires JWT)
- `POST /api/auth/logout` - Logout user (requires JWT)

### API Keys
- `POST /api/keys/generate` - Generate new API key (requires JWT)
- `GET /api/keys/list` - List user's API keys (requires JWT)
- `DELETE /api/keys/revoke/<id>` - Revoke API key (requires JWT)
- `POST /api/keys/validate` - Validate API key

### Audit Logs
- `GET /api/logs/activity` - Get activity logs (requires JWT)
- `GET /api/logs/stats` - Get activity statistics (requires JWT)

## Environment Setup

Create `.env` file:
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/httff_auth
```

## Database

PostgreSQL with tables for:
- **users** - User accounts
- **api_keys** - API keys
- **audit_logs** - Activity logging

Initialize database:
```bash
psql -U postgres -d httff_auth -f database/schema.sql
```

## Security

- Passwords hashed with bcrypt
- API keys hashed before storage
- JWT token-based authentication
- CORS configured for frontend
- SQL injection prevention via ORM
- Comprehensive audit logging

## Deployment

Ready to deploy on:
- Heroku
- AWS EC2 + RDS
- DigitalOcean
- VPS

See full README for deployment instructions.

## License

MIT License

---

Made with ❤️ for HTTFF Auth System
