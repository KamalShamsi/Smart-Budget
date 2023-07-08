import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to access the navigation object

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });

      // Handle successful login
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
