import { useState, useContext } from 'react';
   import { AuthContext } from '../context/AuthContext.jsx';
   import axios from 'axios';
   import { useNavigate } from 'react-router-dom';
   import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

   const Register = () => {
     const { login } = useContext(AuthContext);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [role, setRole] = useState('user');
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const res = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
         login(res.data.token, res.data.user);
         navigate('/dashboard');
       } catch (err) {
         setError(err.response?.data?.message || 'Registration failed');
       }
     };

     return (
       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
         <Card style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s' }}>
           <Card.Body>
             <Card.Title className="text-center mb-4">Register for Sweet Shop</Card.Title>
             {error && <Alert variant="danger">{error}</Alert>}
             <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-3">
                 <Form.Label>Username</Form.Label>
                 <Form.Control
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder="Enter username"
                   required
                 />
               </Form.Group>
               <Form.Group className="mb-3">
                 <Form.Label>Password</Form.Label>
                 <Form.Control
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter password"
                   required
                 />
               </Form.Group>
               <Form.Group className="mb-3">
                 <Form.Label>Role</Form.Label>
                 <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
                 </Form.Select>
               </Form.Group>
               <Button type="submit" variant="primary" className="w-100">Register</Button>
             </Form>
           </Card.Body>
         </Card>
       </Container>
     );
   };

   export default Register;