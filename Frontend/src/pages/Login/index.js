import React from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";
import Card from "../../components/Card";

const LoginPage = () => {
  return (
    <div className="login_page_wrapper">
      <div className="login_card_container">
        <Card color="white">
          <h2>Login</h2>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
