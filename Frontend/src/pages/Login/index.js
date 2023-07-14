import React from "react";
import LoginForm from "../../components/LoginForm";
import Card from "../../components/Card";
import './styles.css';

const LoginPage = () => {
  return (
    <div className="login_page_wrapper">
      <div className="login_card_container">
        <div className="background_container">
          <h1 className="background_text">Smart Budget</h1>
          <p className="background_text_secondary">
            Smart Decisions start here
          </p>
        </div>
        <Card color="white">
          <h2 className="login_title">Login</h2>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
