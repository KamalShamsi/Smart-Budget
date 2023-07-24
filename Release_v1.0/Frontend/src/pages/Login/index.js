import React from 'react';
import LoginForm from '../../components/LoginForm';
import Footer from "../../components/Footer";
import backgroundImg from "../../images/register.png";
import { Box } from '@mui/material';

const Login = () => {
  return (
    <Box sx={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      p: 3,
      position: 'relative', // Added positioning context
    }}>
      <LoginForm />
      
      <Footer/>
    </Box>
  );
};

export default Login;
