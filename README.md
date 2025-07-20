# 🎓 SharpLearn - Employee Learning Platform

A comprehensive full-stack e-learning platform designed for employee skill development and training. Built with modern web technologies including React, Node.js, Express, and MongoDB.

## 🚀 Features

### 🎯 Core Features

- **User Authentication** - Secure JWT-based login/signup system
- **Course Management** - Browse, search, and view detailed course information
- **Shopping Cart** - Add/remove courses and purchase functionality
- **Search Functionality** - Real-time course search with filtering
- **Responsive Design** - Mobile-first responsive UI
- **User Dashboard** - Track enrolled courses and progress

### 💡 Advanced Features

- **Referral System** - User referral tracking and rewards
- **Balance Management** - Virtual wallet for course purchases
- **Course Categories** - Organized course catalog by technology
- **Demo Videos** - Course preview functionality
- **Real-time Updates** - Dynamic content loading

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0** - Modern UI library
- **Material-UI 5.12.2** - Component library and design system
- **React Router DOM 6.10.0** - Client-side routing
- **Axios 1.6.8** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express 4.19.2** - Web application framework
- **MongoDB** - NoSQL database with Mongoose 8.2.3
- **JWT** - JSON Web Token authentication
- **bcrypt 5.1.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone Repository

```bash
git clone <repository-url>
cd SharpLearn-production
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

The project uses hardcoded configuration for simplicity. Key settings are configured in:

- `backend/index.js` - Database URI, JWT secret, CORS origins
- `frontend/src/utils.js` - API base URL

### 5. Database Setup

```bash
cd backend
node seedData.js  # If seed file exists
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

#### Start Frontend Development Server

```bash
cd frontend
npm start
# Application opens at http://localhost:3000
```

### Production Mode

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

## 📁 Project Structure

```
SharpLearn-production/
├── backend/
│   ├── models/
│   │   ├── user.js          # User schema and model
│   │   ├── course.js        # Course schema and model
│   │   └── share.js         # Referral schema and model
│   ├── index.js             # Main server file with routes
│   ├── package.json         # Backend dependencies
│   └── .gitignore          # Git ignore rules
│
└── frontend/
    ├── public/
    │   ├── index.html       # Main HTML template
    │   └── logoSizeS.png    # Application logo
    │
    └── src/
        ├── components/      # Reusable UI components
        │   ├── Bar/
        │   │   ├── NavBar/  # Navigation component
        │   │   └── Footer/  # Footer component
        │   ├── Loader/      # Loading spinner
        │   ├── ShowMsg/     # Message display
        │   └── ...
        │
        ├── pages/           # Route components
        │   ├── HomePage.js
        │   ├── AllCoursePage.js
        │   ├── CourseDetailsPage.js
        │   ├── CartPage.js
        │   ├── LoginPage.js
        │   └── ...
        │
        ├── services/        # API service layer
        │   ├── auth.js      # Authentication services
        │   ├── courses.js   # Course-related API calls
        │   └── cart.js      # Shopping cart services
        │
        ├── styles/          # CSS stylesheets
        ├── images/          # Static assets
        ├── utils.js         # Utility functions
        ├── routes.js        # Route configuration
        └── index.js         # Application entry point
```

## 🔌 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password reset
- `GET /auth/verify-token` - Token validation

### Courses

- `GET /courses` - Get all courses (with optional search)
- `GET /courses/:id` - Get course by ID
- `GET /courses-limited` - Get limited courses (homepage)
- `GET /courses-other/:id` - Get other courses (excluding specific ID)

### Cart Management

- `GET /cart` - Get user's cart items
- `POST /cart/add` - Add course to cart
- `DELETE /cart/remove/:courseId` - Remove course from cart
- `POST /cart/purchase` - Purchase cart items

### User Management

- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/enrolled` - Get enrolled courses

### Referral System

- `POST /referral/apply` - Apply referral code
- `GET /get_all/:id` - Get referral details

## 🎨 UI/UX Features

### Design System

- **Material Design** principles with Material-UI components
- **Responsive Grid** system for all screen sizes
- **Consistent Color Scheme** across all components
- **Loading States** for better user experience
- **Error Handling** with user-friendly messages

### Navigation

- **Dynamic NavBar** with user authentication states
- **Search Integration** in navigation bar
- **Mobile-Responsive** hamburger menu
- **Breadcrumb Navigation** for better orientation

## 🔧 Configuration

### Database Configuration

```javascript
// backend/index.js
const MONGO_URI =
  "mongodb+srv://username:password@cluster.mongodb.net/sharplearn";
```

### API Configuration

```javascript
// frontend/src/utils.js
const apiBaseUrl = "http://localhost:4000/";
```

### CORS Configuration

```javascript
// backend/index.js
const allowlist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://www.sharplearn.tech",
];
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Course browsing and search
- [ ] Add/remove items from cart
- [ ] Course purchase flow
- [ ] Responsive design on mobile
- [ ] Navigation between pages

### API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Test login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## 🚀 Deployment

### Backend Deployment

1. Deploy to platforms like Heroku, Railway, or AWS
2. Update MONGO_URI with production database
3. Configure CORS for production domain
4. Set up environment variables for production

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to Netlify, Vercel, or AWS S3
3. Update API base URL for production
4. Configure routing for SPA

## 🤝 Contributing

### Development Guidelines

1. Follow React functional component patterns
2. Use Material-UI components consistently
3. Implement proper error handling
4. Write clean, readable code
5. Test functionality before submitting

### Code Style

- Use ES6+ features
- Follow consistent naming conventions
- Add comments for complex logic
- Keep components small and focused

## 📝 License

This project is developed for educational and training purposes.

## 👨‍💻 Author

**Adarsh Suman**

- Email: adarsh3699@gmail.com

## 🙏 Acknowledgments

- Material-UI team for excellent component library
- MongoDB for flexible database solution
- React community for comprehensive documentation

---

## 🎯 Current Status: Production Ready ✅

The SharpLearn platform is fully functional with:

- ✅ 21 diverse courses across multiple technologies
- ✅ Complete user authentication system
- ✅ Fully functional shopping cart
- ✅ Real-time search functionality
- ✅ Responsive mobile design
- ✅ Clean, maintainable codebase
- ✅ MongoDB integration
- ✅ JWT security implementation

**Ready for deployment and scaling!** 🚀
