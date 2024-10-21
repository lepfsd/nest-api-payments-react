import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const saveTokenToSessionStorage = (token) => {
    sessionStorage.setItem('authToken', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para manejar el login
    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/signin', { 
          username: username, password: password
        });
        const token = response.data?.access_token
        saveTokenToSessionStorage(token)
        navigate('/');
      
    } catch (error) {
        console.error('There was an error!', error);
      
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>username </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
