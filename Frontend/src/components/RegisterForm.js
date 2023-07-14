import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '300px',
  },
  button: {
    marginTop: theme.spacing(2),
    width: '300px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Hook to access the navigation object

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        password,
        firstName,
        lastName,
      });

      // Handle successful registration
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to the login page
      } else {
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.response.data.error);
    }
  };

  const handleCancel = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.heading}>Smart Budget</h2>
      <TextField
        className={classes.textField}
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default RegisterForm;
