import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand>Sweet Shop</Navbar.Brand>
      <Nav>
        {user ? (
          <Button variant="danger" onClick={logout}>Logout</Button>
        ) : (
          <>
            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;