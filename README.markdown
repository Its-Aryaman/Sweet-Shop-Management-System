# Sweet Shop Management System

A full-stack web application for managing a sweet shop's inventory, user authentication, and purchase/restock operations. The frontend is built with React and Bootstrap. The backend uses Node.js, Express, MongoDB, and JWT for authentication, with Swagger for API documentation.

## Features

- **User Authentication**: Register and login with JWT-based authentication. Supports `user` and `admin` roles.
- **Sweets Management**:
  - **Users**: View sweets, search by name, and buy sweets.
  - **Admins**: Add, edit, delete, and restock sweets.
- **UI Design**:
  - Responsive dashboard with a search bar, table for sweets, and action buttons.
- **API Documentation**: Swagger UI at `/api-docs` for testing endpoints.
- **Backend**: MongoDB for data storage, Express for API, JWT for secure access.

## Tech Stack

- **Frontend**: React, React Bootstrap, Vite, Tailwind CSS.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.
- **API Docs**: Swagger.


## My AI Usage

### AI Tools Used
- **Grok by xAI**: The primary AI tool used for brainstorming, development, debugging, and documentation of this project.

### How I Used Grok
- **Frontend Development**:
  - I used Grok to generate the initial structure of React components.
  - Grok helped modify the "Add Sweet" button in `Dashboard.jsx` to use the `btn-custom-purple` class (`#563d7c` background, white text, hover `#4b3666`), ensuring consistency with the Login/Register buttons while preserving alignment and icon styling.
  - I asked Grok to provide troubleshooting steps for frontend issues, such as verifying button styles and responsive design in DevTools.
- **Backend Development**:
  - Grok assisted in generating the backend API routes (`auth.js`, `sweets.js`) with proper middleware for JWT authentication and admin role checks.
  - I used Grok to brainstorm the structure of API endpoints (e.g., `/api/sweets`, `/api/sweets/{id}/buy`) and ensure they aligned with RESTful principles.
- **Documentation**:
  - I relied on Grok to draft and refine this `README.md`, ensuring it included clear installation steps, usage instructions, and styling details.
- **Debugging and Optimization**:
  - Grok suggested verification steps for the frontend and backend .



## Screenshots

Below are screenshots of the key interfaces in the Sweet Shop Management System:

- **Login Page**: Shows the login form with username and password.
  ![Login Page](screenshots/Login.png)
- **Register  Page**: Shows the Register form with username and password and user type.
  ![Register Page](screenshots/Register.png)
- **Dashboard**: Displays the search bar, sweets table, and "Add Sweet" button.
  ![Dashboard](screenshots/Dashboard.png)
- **Swagger UI**: Interactive API documentation for testing endpoints.
  ![Swagger UI](screenshots/Swagger.png)



*Note*: Screenshots are stored in the `screenshots/` folder. See **Adding Screenshots** below for instructions on capturing and updating them.


## API Endpoints

- **Authentication**:
  - `POST /api/auth/register`: Register a user (`username`, `password`, optional `role`).
  - `POST /api/auth/login`: Login and get JWT token.
- **Sweets**:
  - `GET /api/sweets`: List all sweets (authenticated).
  - `POST /api/sweets`: Add a sweet (authenticated).
  - `GET /api/sweets/search?name=<query>`: Search sweets by name (authenticated).
  - `PUT /api/sweets/:id`: Update a sweet (authenticated).
  - `DELETE /api/sweets/:id`: Delete a sweet (admin only).
  - `POST /api/sweets/:id/buy`: Buy a sweet (authenticated).
  - `POST /api/sweets/:id/restock`: Restock a sweet (admin only).

## Prerequisites

- **Node.js**: v16 or higher.
- **MongoDB**: Local or Atlas instance.
- **Git**: For cloning and version control.

## Installation

### Clone the Repository
```bash
git clone <your-repo-url>
cd sweet-shop
```


### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your_jwt_secret_here
   ```
   - Replace `MONGODB_URI` with your MongoDB connection string (local or Atlas).
   - Set a secure `JWT_SECRET` (e.g., a random string).
4. Start the backend:
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:5000`.
   - Swagger docs at `http://localhost:5000/api-docs`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:5173`.

## Usage

1. **Access the App**:
   - Open `http://localhost:5173` in your browser.
   - Register (`/register`) or login (`/login`) with credentials (e.g., `admin/admin123` or `test/test123`).
2. **Dashboard**:
   - **Search**: Use the top search bar to filter sweets by name.
   - **Add Sweet**: Click "Add Sweet" (purple button) to open a modal and add a new sweet (admin only).
   - **Edit/Buy/Restock/Delete**: Use table action buttons (admin for restock/delete).
   - **Save**: Save changes in the Add/Edit modal.
   - **Logout**: Via navbar dropdown (`bi-person-fill` icon).
3. **API Testing**:
   - Open `http://localhost:5000/api-docs`.
   - Use Swagger UI to test endpoints (e.g., register, login, add sweet).
   - Authorize with JWT token from `/api/auth/login`.

## API Endpoints

- **Authentication**:
  - `POST /api/auth/register`: Register a user (`username`, `password`, optional `role`).
  - `POST /api/auth/login`: Login and get JWT token.
- **Sweets**:
  - `GET /api/sweets`: List all sweets (authenticated).
  - `POST /api/sweets`: Add a sweet (authenticated).
  - `GET /api/sweets/search?name=<query>`: Search sweets by name (authenticated).
  - `PUT /api/sweets/:id`: Update a sweet (authenticated).
  - `DELETE /api/sweets/:id`: Delete a sweet (admin only).
  - `POST /api/sweets/:id/buy`: Buy a sweet (authenticated).
  - `POST /api/sweets/:id/restock`: Restock a sweet (admin only).

See Swagger UI (`/api-docs`) for detailed schemas and examples.

## Running Tests

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Run tests:
   ```bash
   npm test
   ```
   - Tests button alignment, icon colors (`#563d7c`), layout, and functionality.

## Project Structure

```
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
│   ├── Db/
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
```
