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
      <MenuButton link="/dashboard" name="Home" color="#7bc043" hovercolor ="#ffd900" />
      <MenuButton link="/add" name="Manage" color="#0392cf" hovercolor ="#ffd900" />
      <MenuButton link="/profile" name="Profile" color="#f37736" hovercolor ="#ffd900" />
      <MenuButton link="/savings" name="Savings" color="#ee4035" hovercolor ="#ffd900" />
    </Grid>
  )
}


export default MenuBar