import React from "react";
import { Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      bgcolor="#0d47a1"
      color="white"
      textAlign="center"
      py={2}
      mt={3}
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
    > 
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
      <Typography variant="body2">
        Smart Budget - CSE 115A Project by Team FTX
      </Typography>
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
