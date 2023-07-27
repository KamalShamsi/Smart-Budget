import React, { useState } from 'react';
import { Avatar, Box, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const AvatarComponent = () => {
  // State variables to manage the avatar selection dialog
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem('selectedAvatar') || '');

  // Array of avatar URLs
  const avatars = [
    // List of avatar URLs
    // ...
  ];

  // Event handler when an avatar is clicked
  const handleAvatarClick = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    localStorage.setItem('selectedAvatar', avatarUrl); // Save the selected avatar URL to local storage
    setOpen(false); // Close the avatar selection dialog
  };

  // Event handler to open the avatar selection dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Event handler to close the avatar selection dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Avatar display with the selected or default avatar */}
      <Avatar
        src={selectedAvatar || 'https://i.imgur.com/yjtru.jpg'}
        alt="Profile Picture"
        sx={{ width: '150px', height: '150px', fontSize: '5rem', backgroundColor: '#3f51b5' }}
      >
        <AccountCircleIcon fontSize="inherit" color="primary" />
      </Avatar>
      <Box mt={2} textAlign="center">
        {/* Text indicating the option to change the profile picture */}
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={handleOpenDialog}>
          Change Picture
        </Typography>
      </Box>
      {/* Avatar selection dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          {/* Title of the avatar selection dialog */}
          <Typography variant="h6" color="primary" align="center" gutterBottom>
            Select Profile Picture
          </Typography>
          {/* Grid layout to display avatar options */}
          <Grid container spacing={2}>
            {/* Map through the avatar URLs to display avatar options */}
            {avatars.map((avatarUrl, index) => (
              <Grid item key={index}>
                {/* Avatar option represented by an icon button */}
                <IconButton onClick={() => handleAvatarClick(avatarUrl)}>
                  <Avatar src={avatarUrl} sx={{ width: '80px', height: '80px' }} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarComponent;
