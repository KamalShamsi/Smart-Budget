import React from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './style.css'
import Card from '../../components/Card'

const LoginPage = () => {
  return (
    <div className='background'>
      <div className='login_card_container'>
        <Card color='white' width='40%'>
          <h2>Login</h2>
          <LoginForm />
        </Card>
      </div>
    </div>
  );



};

export default LoginPage;
