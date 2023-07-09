import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div>
      <h3>Profile</h3>
      <form>
        <label>
          Username:
          <input type="text" value="ExampleUsername" readOnly />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" value="ExampleFirstName" readOnly />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value="ExampleLastName" readOnly />
        </label>
      </form>
      <button onClick={handleLogout}>Logout</button> {/* Add the logout button */}
      <BottomBar />
    </div>
  );
}
