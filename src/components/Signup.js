import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import { useFirebase } from "react-redux-firebase";

import { Link, Redirect } from "react-router-dom"


function Signup({ auth }) {
  const [ formData, setFormData ] = useState({ email: "", password: "", passwordConfirm: "" });

  const firebase = useFirebase();

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.password !== formData.passwordConfirm) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      firebase.createUser(formData)
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
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
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleFormChange} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}

const mapState = ({ firebase }) => ({ auth: firebase.auth });

export default connect(mapState)(Signup)