import React, { useEffect, useState } from 'react';
import AvatarComponent from '../../components/AvatarComponent';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Link,
  TextField,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../../components/Footer';

const Profile = () => {
  const [userProfile, setUserProfile] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState('');

  const getUserProfile = async () => {
    try {
      const token = Cookies.get('tok');
      const response = await axios.get('http://localhost:8000/profile', {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setUserProfile(response.data.profile);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('user_id');
    Cookies.remove('tok');
    window.location.href = '/login';
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSelectPicture = (picture) => {
    setSelectedProfilePicture(picture);
  };

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Profile
        </Typography>
        <Box bgcolor="#1565c0" height={2} width={150} mx="auto" my={2} borderRadius={5} />
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Link component={RouterLink} to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{ marginRight: '10px', height: 60, width: 130, fontSize: '1.2rem', bgcolor: '#FFC107' }}
          >
            Home
          </Button>
        </Link>
        <Link component={RouterLink} to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            sx={{ marginRight: '10px', height: 60, width: 200, fontSize: '1.2rem', bgcolor: '#03A9F4 ' }}
          >
            Management
          </Button>
        </Link>
        <Link component={RouterLink} to="/savings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MonetizationOnIcon />}
            sx={{ marginRight: '10px', height: 60, width: 130, fontSize: '1.2rem', bgcolor: '#FF9800' }}
          >
            Savings
          </Button>
        </Link>
        <Link component={RouterLink} to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon />}
            sx={{ fontSize: '1.2rem', height: 60, width: 130, bgcolor: '#4CAF50' }}
          >
            Profile
          </Button>
        </Link>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <AvatarComponent
                currentPicture={selectedProfilePicture || 'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg'}
                onSelectPicture={handleSelectPicture}
              />

              <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
                {userProfile.username}
              </Typography>

              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  First Name
                </Typography>
                <TextField
                  value={userProfile.first_name}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Last Name
                </Typography>
                <TextField
                  value={userProfile.last_name}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Email
                </Typography>
                <TextField
                  value={userProfile.email}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Occupation
                </Typography>
                <TextField
                  value={userProfile.job}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<ExitToAppIcon />}
                sx={{ mt: 2, width: '100%' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Profile;
