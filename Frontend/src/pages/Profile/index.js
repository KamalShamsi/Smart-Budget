import React, { useEffect, useState } from 'react';
import AvatarComponent from '../../components/AvatarComponent';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Link,
  InputLabel,
  Input,
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
                currentPicture={
                  selectedProfilePicture ||
                  'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg'
                }
                onSelectPicture={handleSelectPicture}
              />

              <Typography variant="h6" color="primary" sx={{ my: 3 }}>
                {/* Special Styling for Username */}
                <Box
                  sx={{
                    backgroundColor: '#1565c0',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {userProfile.username}
                </Box>
              </Typography>

              {/* First Name */}
              <Box sx={{ mb: 1 }}>
                <InputLabel htmlFor="first-name" sx={{ color: 'text.secondary' }}>
                  First Name
                </InputLabel>
                <Input
                  id="first-name"
                  value={userProfile.first_name}
                  readOnly
                  fullWidth
                />
              </Box>

              {/* Last Name */}
              <Box sx={{ mb: 1 }}>
                <InputLabel htmlFor="last-name" sx={{ color: 'text.secondary' }}>
                  Last Name
                </InputLabel>
                <Input
                  id="last-name"
                  value={userProfile.last_name}
                  readOnly
                  fullWidth
                />
              </Box>

              {/* Email */}
              <Box sx={{ mb: 1 }}>
                <InputLabel htmlFor="email" sx={{ color: 'text.secondary' }}>
                  Email
                </InputLabel>
                <Input
                  id="email"
                  value={userProfile.email}
                  readOnly
                  fullWidth
                />
              </Box>

              {/* Occupation */}
              <Box sx={{ mb: 2 }}>
                <InputLabel htmlFor="occupation" sx={{ color: 'text.secondary' }}>
                  Occupation
                </InputLabel>
                <Input
                  id="occupation"
                  value={userProfile.job}
                  readOnly
                  fullWidth
                />
              </Box>

              {/* Phone Number */}
              <Box sx={{ mb: 2 }}>
                <InputLabel htmlFor="phone" sx={{ color: 'text.secondary' }}>
                  Phone Number
                </InputLabel>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  readOnly
                  fullWidth
                />
              </Box>

              {/* Logout Button */}
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
