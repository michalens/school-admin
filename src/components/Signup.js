import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { connect } from "react-redux"

import { Link, Redirect, useHistory } from "react-router-dom"

import { signup } from "../store/actions/authActions"

function Signup({ signup, currentUser }) {
  const [ formData, setFormData ] = useState({ email: "", password: "", passwordConfirm: "" });


  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.password !== formData.passwordConfirm) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      signup(formData.email, formData.password)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  function handleFormChange({ target }) {
    setFormData(prev => ({...prev, [target.name]: target.value }))
  }

  if (currentUser) {
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

const mapState = ({ auth }) => ({ currentUser: auth.currentUser});

export default connect(mapState, { signup })(Signup)