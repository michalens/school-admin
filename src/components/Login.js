import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useFirebase } from 'react-redux-firebase';
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux";

function Login({ auth }) {
  const [ formData, setFormData ] = useState({ email: "", password: "" });

  const firebase = useFirebase();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      firebase.login(formData)
    } catch (e){
      console.log(e)
    }
  }

  function handleFormChange({ target }) {
    setFormData(prev => ({...prev, [target.name]: target.value }))
  }

  if (auth.uid) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={formData.email} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" value={formData.password} onChange={handleFormChange} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}

const mapState = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}


export default connect(mapState)(Login)