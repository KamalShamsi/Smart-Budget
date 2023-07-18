import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Link, TextField } from '@mui/material';
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
  ExitToApp as ExitToAppIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import Cookies from "js-cookie";
import axios from "axios";
import MenuBar from "../../components/MenuBar"

const Profile = () => {

  const [userProfile, setUserProfile] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const getUserProfile = async () => {
    try {
      const token = Cookies.get("tok");
      const response = await axios.get("http://localhost:8000/profile", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setUserProfile(response.data.profile);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = Cookies.get("tok");
      const response = await axios.post(
        "http://localhost:8000/profile",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setUserProfile(response.data.profile);
        setFirstName(response.data.profile.first_name);
        setLastName(response.data.profile.last_name);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update user profile:", error);
      setEditMode(false);
    }
  };

  return (
    <Box bgcolor="#0d47a1" minHeight="100vh" p={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">
          Profile
        </Typography>
        <Box
          bgcolor="#1565c0"
          height={2}
          width={150}
          mx="auto"
          my={2}
          borderRadius={5}
        />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <MenuBar/>
        {/* Profile-specific components */}
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Box
                display="flex"
                alignItems="center"
                mb={2}
                sx={{ color: 'white' }}
              >
                <Typography variant="h6" ml={1} color="black">
                  {userProfile.username}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Box textAlign="center" color="black">
              {editMode ? (
                  <>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                      mb={1}
                    />
                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      mb={1}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSaveClick}
                      sx={{ mt: 2, width: '100%' }}
                      startIcon={<GetAppIcon />}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" mb={1} color="black">
                      First Name: {userProfile.first_name}
                    </Typography>
                    <Typography variant="body1" mb={1} color="black">
                      Last Name: {userProfile.last_name}
                    </Typography>
                    <Typography variant="body1" mb={1} color="black">
                      Email: 
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleEditClick}
                      sx={{ mt: 2, width: '100%' }}
                      startIcon={<ExitToAppIcon />}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box textAlign="center">
              <Button
                variant="contained"
                startIcon={<ExitToAppIcon />}
                sx={{ mt: 2, width: '100%' }}
                href="/login"
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
