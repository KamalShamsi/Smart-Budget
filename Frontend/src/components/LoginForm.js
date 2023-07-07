import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
