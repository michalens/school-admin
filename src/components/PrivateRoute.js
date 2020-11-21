import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

function PrivateRoute({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return auth.uid ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

const mapState = ({ firebase }) => {
  return {
    auth: firebase.auth
  }
 };

export default connect(mapState)(PrivateRoute)