# **DANCERS - EXPLORE THE ART OF DANCE**

## Overview

**Dancers** is a full-stack web application designed to manage and explore dance styles and dancers. The platform allows users to authenticate, view different dance styles, and manage dancer information. It provides an intuitive dashboard for browsing dancers by their dance styles and offers role-based access control for managing the database.

---

## Tech Stack

### **Frontend**

- **HTML5** - Structure and layout
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Client-side logic and API interactions
- **Fetch API** - HTTP requests to backend

### **Backend**

- **Python 3.x** - Core programming language
- **Flask** - Web framework for REST API
- **SQLAlchemy** - ORM for database operations
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Werkzeug** - Password hashing and security
- **PyJWT** - JSON Web Token authentication
- **Marshmallow** - Object serialization/deserialization
- **Gunicorn/Waitress** - WSGI HTTP servers for production

### **Database**

- **PostgreSQL** - Primary database hosted on Supabase
- **psycopg2** - PostgreSQL adapter for Python

### **Deployment**

- **Backend**: Deployed on [Render](https://render.com)
- **Frontend**: Deployed on [Vercel]()
- **Database**: Hosted on [Supabase](https://supabase.com)

---

## Live Deployment

https://dancers-8lf9w61qi-shreyusharma11-4199s-projects.vercel.app/

---

## Installation & Setup

Follow these steps to run the project locally after cloning the repository:

### **Prerequisites**

- Python 3.8 or higher
- PostgreSQL database (or use the existing Supabase connection)
- Git

### **Steps to Run Locally**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/shreyasharma003/Dancers.git
   cd Dancers
   ```

2. **Set Up Virtual Environment**

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install Backend Dependencies**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   - Copy the `.env.example` file to `.env`:
     ```powershell
     cp .env.example .env
     ```
   - Open `.env` and update the following variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SECRET_KEY`: A secure random string for JWT token signing (generate using `python -c "import secrets; print(secrets.token_hex(32))"`)
     - `FLASK_ENV`: Set to `development` for local development or `production` for deployment
     - `FLASK_DEBUG`: Set to `True` for development, `False` for production

   **Example `.env` file:**

   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   SECRET_KEY=your_secure_random_secret_key_here
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. **Run the Backend Server**

   ```bash
   python app.py
   ```

   The backend will start at `http://127.0.0.1:5000`

6. **Configure Frontend API URL**

   - Open `frontend/api.js`
   - Update the `API_BASE_URL` to point to your local backend:
     ```javascript
     const API_BASE_URL = "http://127.0.0.1:5000";
     ```

7. **Run the Frontend**
   - Open `frontend/index.html` in your browser, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     cd frontend
     python -m http.server 8000
     ```
   - Access the app at `http://localhost:8000`

---

## Project Structure

```
dancers_website/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── models.py           # Database models (Dancer, DanceStyle, User)
│   ├── routes.py           # API routes for dancers and dance styles
│   ├── auth.py             # Authentication routes (login, signup)
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Landing page
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── dashboard.html      # Main dashboard
│   ├── api.js              # API utility functions
│   └── sources/            # Images and assets
└── README.md
```

---

## Key Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Dance Styles Management**: View and explore different dance styles
- **Dancer Profiles**: Browse dancers with their details (name, email, salary, joining date, dance style)
- **Role-Based Access**: Admin and user role differentiation
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: Clean API endpoints for all operations

---

## Future Scope & Implementations

1. **Advanced Search & Filtering**: Implement filters for dancers by salary range, joining date, and multiple dance styles with pagination for better performance.

2. **Media Gallery & Social Features**: Add video/image galleries for dancers showcasing their performances, along with social features like comments, ratings, and the ability to follow favorite dancers.

---

## Developer

**Shreya Sharma**  
GitHub: [@shreyasharma003](https://github.com/shreyasharma003)

---
