import React, { useState } from 'react';
import { Avatar, Box, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const AvatarComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem('selectedAvatar') || '');

  const avatars = [
    'https://media.tenor.com/eCnWd9-KUwYAAAAC/funny-face-batman.gif',
    'https://ei.marketwatch.com/Multimedia/2018/04/01/Photos/ZH/MW-GG584_elonmu_20180401183848_ZH.jpg?uuid=718ed170-35fd-11e8-a3b7-ac162d7bc1f7',
    'https://i.guim.co.uk/img/media/5ed54edd5d9d620487c523150e4672e3df43e442/0_197_3000_1800/master/3000.jpg?width=700&quality=85&auto=format&fit=max&s=1ddc1545e19b0e7bd66272d736d613ee',
    'https://images.saatchiart.com/saatchi/1826651/art/8622131/7685814-FEUHPJON-7.jpg',
    'https://img.wattpad.com/edec33bd7fd0b7edae1c79a43e068c7e462f7318/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f504c734562626d48644647314a773d3d2d3435373836303536342e313464633134316235303065336337303734373433363532303033302e676966',
    'https://media.tenor.com/whuNNM7sBzcAAAAM/ogvhs-laughing.gif',
    'https://i.pinimg.com/originals/b3/9c/0f/b39c0f73f6535fa3c5549c59cecc9ce3.gif',
    'https://media.tenor.com/O_Xz04m4F4AAAAAM/mark-zuckerberg-facebook.gif',
    'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg',
    'https://media.tenor.com/xSfy4B1dbrsAAAAM/cobra-tate-cobra.gif',
  ];

  const handleAvatarClick = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    localStorage.setItem('selectedAvatar', avatarUrl);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar
        src={selectedAvatar || 'https://i.imgur.com/yjtru.jpg'}
        alt="Profile Picture"
        sx={{ width: '150px', height: '150px', fontSize: '5rem', backgroundColor: '#3f51b5' }}
      >
        <AccountCircleIcon fontSize="inherit" color="primary" />
      </Avatar>
      <Box mt={2} textAlign="center">
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={handleOpenDialog}>
          Change Picture
        </Typography>
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h6" color="primary" align="center" gutterBottom>
            Select Profile Picture
          </Typography>
          <Grid container spacing={2}>
            {avatars.map((avatarUrl, index) => (
              <Grid item key={index}>
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
