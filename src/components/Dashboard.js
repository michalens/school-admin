import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  Button,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const { currentUser, fetchGroups, addStudent } = useAuth();
  const history = useHistory();

  async function sumbitStudent() {
    const std = await addStudent();
    console.log(std);
  }

  async function getGroups() {
    const groups = await fetchGroups();
    const newState = [];
    groups.forEach((gr) => newState.push({ id: gr.id, ...gr.data() }));
    setGroups(newState);
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Add user</h2>
              <Form>
                <Form.Control as="select">
                  {groups?.map(gr => <option key={gr.id}>{gr.name}</option>)}
                </Form.Control>
              </Form>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
