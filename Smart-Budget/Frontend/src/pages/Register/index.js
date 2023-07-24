import React from "react";
import RegisterForm from "../../components/RegisterForm";
import Footer from "../../components/Footer";
import backgroundImg from "../../images/register.png";
import { Box } from '@mui/material';

const RegisterPage = () => {
  return (
    <Box sx={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      p: 3,
      position: 'relative', // Added positioning context
    }}>
      <RegisterForm />
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default RegisterPage;
