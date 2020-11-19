import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { login } from "../store/actions/authActions"
import { Link, useHistory } from "react-router-dom"
import { connect } from "react-redux";

function Login({ currentUser, login }) {
  const [ formData, setFormData ] = useState({ email: "", password: "" });


  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      const log = await login(formData.email, formData.password)

      console.log('loggedin', log)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  function handleFormChange({ target }) {
    setFormData(prev => ({...prev, [target.name]: target.value }))
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={formData.email} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" value={formData.password} onChange={handleFormChange} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
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

const mapState = ({ auth }) => ({ currentUser: auth.currentUser })

export default connect(mapState, { login })(Login)