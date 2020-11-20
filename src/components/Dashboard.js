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
import { fetchGroups } from "../store/actions/studentsActions";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

function Dashboard({ currentUser, groups, fetchGroups }) {
  const history = useHistory();

  async function sumbitStudent() {
    // const std = await addStudent();
    // console.log(std);
  }

  async function getGroups() {
    // const groups = await fetchGroups();
    // const newState = [];
    // groups.forEach((gr) => newState.push({ id: gr.id, ...gr.data() }));
    // setGroups(newState);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Add user</h2>
              <Form>
                <Form.Control as="select" size="10">
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

const mapState = ({ auth, students }) => ({
   currentUser : auth.currentUser,
   groups: students.groups
});

export default connect(mapState, { fetchGroups })(Dashboard)