import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MuiTelInput } from 'mui-tel-input';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundImage: `url('your-background-image-url')`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '300px',
    height: '700px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%', // Make the text fields take up the full width of the box
  },
  button: {
    
    width: '100%', // Make the buttons take up the full width of the box
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
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      username.trim() === '' ||
      password.trim() === '' ||
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      confirmPassword.trim() === '' ||
      email.trim() === '' ||
      job.trim() === '' ||
      phone.trim() === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Check password length
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    // Check if passwords match
    if (confirmPassword !== password) {
      setConfirmError(true);
      return;
    }

    // Check for a valid email format
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        password,
        firstName,
        lastName,
        email,
        job,
        phone,
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
      alert(error.response.data.error);
    }
  };

  const handleCancel = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
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
            error={passwordError}
            helperText={
              passwordError && 'Password must be at least 6 characters long.'
            }
          />
          <TextField
            className={classes.textField}
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmError}
            helperText={confirmError && 'Must match password.'}
          />
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError && 'Input a valid email (@ with domain name)'}
          />
          <TextField
            className={classes.textField}
            label="Profession"
            variant="outlined"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <MuiTelInput
            className={classes.textField}
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={handleChange}
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
      </Box>
    </Box>
  );
};

export default RegisterForm;
