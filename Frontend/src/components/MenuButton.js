import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Link } from "@mui/material";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
function MenuButton({link, name, color, hovercolor, icon}) {
  let MenuIcon;

  switch (name) {
    case "Home": 
      MenuIcon = <HomeIcon fontSize="large" color="white" />;
      break;
    case "Money Management":
      MenuIcon = <AddCircleIcon fontSize="large" color="white" />;
    case "Profile":
      MenuIcon = <AccountCircleIcon fontSize="large" color="white" />;
    case "Savings":
      MenuIcon = <MonetizationOnIcon fontSize="large" color="white" />;
    default:
      break;
  }


  return (
    <Grid item xs={6} sm={3} md={2}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Link href={link} color="inherit" underline="none">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            transition="background-color 0.3s ease-in-out"
            sx={{
              bgcolor: color,
              "&:hover": {
                bgcolor: hovercolor,
              },
            }}
          >
            {MenuIcon}
            <Typography align="center" variant="body1" color="white" mt={1}>
              {name}
            </Typography>
          </Box>
        </Link>
      </Paper>
    </Grid>
  )
}

export default MenuButton