import { useState, useContext } from 'react';
   import { AuthContext } from '../context/AuthContext.jsx';
   import axios from 'axios';
   import { useNavigate } from 'react-router-dom';
   import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

   const Login = () => {
     const { login } = useContext(AuthContext);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
         login(res.data.token, res.data.user);
         navigate('/dashboard');
       } catch (err) {
         setError(err.response?.data?.message || 'Login failed');
       }
     };

     return (
       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
         <Card style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s' }}>
           <Card.Body>
             <Card.Title className="text-center mb-4">Login to Sweet Shop</Card.Title>
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
               <Button type="submit" variant="primary" className="w-100">Login</Button>
             </Form>
           </Card.Body>
         </Card>
       </Container>
     );
   };

   export default Login;