Sweet Shop Management System
A full-stack web application for managing a sweet shop's inventory, user authentication, and purchase/restock operations. The frontend is built with React and Bootstrap, styled with a coral/cream theme and dark purple highlights (#563d7c). The backend uses Node.js, Express, MongoDB, and JWT for authentication, with Swagger for API documentation.
Features

User Authentication: Register and login with JWT-based authentication. Supports user and admin roles.
Sweets Management:
Users: View sweets, search by name, and buy sweets.
Admins: Add, edit, delete, and restock sweets.


UI Design:
Responsive dashboard with a search bar, table for sweets, and action buttons.
Buttons: 
Search/Save: Large, dark purple (#563d7c), white text, hover #4b3666.
Add Sweet: Large, purple (#563d7c), white text, hover #4b3666.
Edit/Buy/Restock/Delete/Cancel: Smaller, dark purple (#563d7c), white text, hover #4b3666.


Icons: Bootstrap Icons (bi-search, bi-plus-circle, bi-save, etc.) in #563d7c.
Coral/cream theme (#ff6f61, #fff3e0) with no welcome message or logout button (logout in navbar dropdown).


API Documentation: Swagger UI at /api-docs for testing endpoints.
Backend: MongoDB for data storage, Express for API, JWT for secure access.

Tech Stack

Frontend: React, React Bootstrap, Bootstrap Icons, Vite, Tailwind CSS (via index.css).
Backend: Node.js, Express, MongoDB, Mongoose, JWT.
API Docs: Swagger (swagger-jsdoc, swagger-ui-express).
Testing: Jest, React Testing Library (frontend).

Prerequisites

Node.js: v16 or higher.
MongoDB: Local or Atlas instance.
Git: For cloning and version control.

Installation
Clone the Repository
git clone <your-repo-url>
cd sweet-shop

Backend Setup

Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in backend/ with:PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_jwt_secret_here


Replace MONGODB_URI with your MongoDB connection string (local or Atlas).
Set a secure JWT_SECRET (e.g., a random string).


Start the backend:npm run dev


Runs on http://localhost:5000.
Swagger docs at http://localhost:5000/api-docs.



Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Start the frontend:npm run dev


Runs on http://localhost:5173.



Usage

Access the App:
Open http://localhost:5173 in your browser.
Register (/register) or login (/login) with credentials (e.g., admin/admin123 or test/test123).


Dashboard:
Search: Use the top search bar to filter sweets by name.
Add Sweet: Click "Add Sweet" (purple button) to open a modal and add a new sweet (admin only).
Edit/Buy/Restock/Delete: Use table action buttons (admin for restock/delete).
Save: Save changes in the Add/Edit modal.
Logout: Via navbar dropdown (bi-person-fill icon).


API Testing:
Open http://localhost:5000/api-docs.
Use Swagger UI to test endpoints (e.g., register, login, add sweet).
Authorize with JWT token from /api/auth/login.



API Endpoints

Authentication:
POST /api/auth/register: Register a user (username, password, optional role).
POST /api/auth/login: Login and get JWT token.


Sweets:
GET /api/sweets: List all sweets (authenticated).
POST /api/sweets: Add a sweet (authenticated).
GET /api/sweets/search?name=<query>: Search sweets by name (authenticated).
PUT /api/sweets/:id: Update a sweet (authenticated).
DELETE /api/sweets/:id: Delete a sweet (admin only).
POST /api/sweets/:id/buy: Buy a sweet (authenticated).
POST /api/sweets/:id/restock: Restock a sweet (admin only).



See Swagger UI (/api-docs) for detailed schemas and examples.
Running Tests

Navigate to frontend directory:cd frontend


Run tests:npm test


Tests button alignment, icon colors (#563d7c), layout, and functionality.



Project Structure
sweet-shop/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── sweets.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── sweetsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── db/
│   │   └── db.js
│   ├── swagger.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── sweetsService.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   └── package.json
└── README.md

Styling Notes

Theme: Coral (#ff6f61) and cream (#fff3e0) with dark purple (#563d7c) buttons/icons.
Buttons:
Search/Save: Large, #563d7c, white text, hover #4b3666.
Add Sweet: Large, #563d7c, white text, hover #4b3666 (uses btn-custom-purple).
Edit/Buy/Restock/Delete/Cancel: Smaller, #563d7c, white text, hover #4b3666.


Icons: #563d7c, 16px (14px on mobile), centered with text (gap-2).
Navbar: #563d7c, no top whitespace, includes bi-shop and bi-person-fill icons.

Troubleshooting

Backend Errors:
Ensure MongoDB is running and MONGODB_URI is correct.
Check JWT_SECRET in .env.
Clear cache: rm -rf node_modules/.cache and npm install.


Frontend Errors:
Verify backend is running (http://localhost:5000).
Check CORS in server.js: app.use(cors()).


Swagger Issues:
Access http://localhost:5000/api-docs.
Ensure swagger.js points to routes/*.js.
Use valid JWT for protected endpoints.


Button Misalignment: Inspect with DevTools; verify index.css for btn-custom-purple and gap: 0.5rem.

Deployment

Backend:
Set MONGODB_URI and JWT_SECRET in production environment.
Update swagger.js server URL (e.g., https://your-api.com).
Deploy with a service like Render or Heroku.


Frontend:
Build: cd frontend && npm run build.
Serve dist/ folder with backend or a static host (e.g., Netlify).
Update API base URL in frontend/src/services/sweetsService.js.



Contributing

Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature".
Push: git push origin feature-name.
Open a pull request.

License
MIT License. See LICENSE file for details.
