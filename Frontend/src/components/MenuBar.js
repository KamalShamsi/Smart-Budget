import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Link } from "@mui/material";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  AccountCircle as AccountCircleIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import MenuButton from "./MenuButton";
function MenuBar() {
  return (
    <Grid container spacing={3} justifyContent="center">
      <MenuButton link="/dashboard" name="Home" color="#1976d2" hovercolor ="#1565c0" />
      <MenuButton link="/add" name="Money Management" color="#0d47a1" hovercolor ="#0a3b8d" />
      <MenuButton link="/profile" name="Profile" color="#1b5e20" hovercolor ="#145214" />
      <MenuButton link="/savings" name="Savings" color="#ff6f00" hovercolor ="#e65100" />
    </Grid>
  )
}

export default MenuBar