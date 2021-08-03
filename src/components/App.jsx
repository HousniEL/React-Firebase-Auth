import React from 'react';
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from './Dashboard';
import Signup from "./Signup";
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
        <Container 
          className="d-flex justify-content-center align-itels-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100 mt-5" style={{ maxWidth: '400px' }} >
            <AuthProvider>
              <Router>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute  path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </Router>
            </AuthProvider>
          </div>
        </Container>
  );
}

export default App;
