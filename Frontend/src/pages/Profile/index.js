import React from 'react';
import BottomBar from '../../components/BottomBar';

export default function Profile() {
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
      <BottomBar />
    </div>
  );
}
