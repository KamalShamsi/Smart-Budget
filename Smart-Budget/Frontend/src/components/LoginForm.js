import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    width: "400px",
  },
  title: {
    marginBottom: theme.spacing(4),
    color: "#333333",
    textAlign: "center",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  signUpText: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  signUpLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to the backend for authentication
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });

      // Handle successful login
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        const { userId, token } = response.data; // Extract the user ID and token from the response

        // Store the user ID and token in the browser cookies
        Cookies.set("user_id", userId);
        Cookies.set ("tok", token)
        navigate("/dashboard"); // Redirect to the dashboard page
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <Typography variant="h5" className={classes.title}>
          Smart Budget
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body1"
          align="center"
          className={classes.signUpText}
        >
          Don't have an account?{" "}
          <Link to="/register" className={classes.signUpLink}>
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginForm;
