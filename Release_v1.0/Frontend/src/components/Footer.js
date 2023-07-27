import React from "react";
import { Typography, Box, Link } from "@mui/material";

// Footer component that displays footer information for the application.
const Footer = () => {
  return (
    <Box
      //#region bgcolor="#0d47a1"
      color="white"
      textAlign="center"
      py={2}
      mt={3}
      bottom={0}
      left={0}
      width="100%"
    > 
      {/* Render the copyright text with the current year */}
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
      {/* Render the project information */}
      <Typography variant="body2">
        Smart Budget - CSE 115A Project by Team FTX
      </Typography>
      {/* Render links to UC Santa Cruz and Baskin School of Engineering */}
      <Link
        href="https://www.ucsc.edu/"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
      >
        UC Santa Cruz
      </Link>{" "}
      |{" "}
      <Link
        href="https://engineering.ucsc.edu/"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
      >
        Baskin School of Engineering
      </Link>

      {/* Render contact information for the team */}
      <Typography variant="body2">
        Contact us at: 
        kshamsi@ucsc.edu |
        ble98@ucsc.edu |
        bmquach@ucsc.edu |
        dakle@ucsc.edu |
        ariaz1@ucsc.edu 
      </Typography>
    </Box>
  );
};

export default Footer;
