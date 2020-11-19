import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

function PrivateRoute({ currentUser, component: Component, ...rest }) {
console.log(currentUser)
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

const mapState = ({ auth }) => {
  console.log(auth)
  return {
    currentUser: auth.currentUser
  }
 };

export default connect(mapState)(PrivateRoute)