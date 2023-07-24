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
      position: 'relative',
    }}>
      <RegisterForm />
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
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
