import React from 'react';
import { Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
