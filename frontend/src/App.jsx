import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import Login from './pages/Login.jsx';
   import Register from './pages/Register.jsx';
   import Dashboard from './pages/Dashboard.jsx';
   import PrivateRoute from './components/PrivateRoute.jsx';
   import CustomNavbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
      <footer className="text-center py-3 mt-4 bg-secondary text-white">
        &copy; 2025 Sweet Shop. All rights reserved.
      </footer>
    </Router>
  );
}

   export default App;