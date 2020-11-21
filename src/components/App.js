import React, { useEffect, useLayoutEffect } from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";
import { connect, useStore } from "react-redux";
import { auth } from "../firebase";
import * as actionTypes from "../store/actions/actionTypes";
// import { fetchUser } from "../store/actions/authActions";

function App() {
  const { dispatch } = useStore();

  // useLayoutEffect(() => {
  //   fetchUser()
  // }, [])


  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default connect()(App);
