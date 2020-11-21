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
import { fetchGroups, selectGroup } from "../store/actions/studentsActions";
import { firebaseConnect, firestoreConnect, populate, useFirebaseConnect } from 'react-redux-firebase'
import { connect, useSelector } from "react-redux";
import { compose } from 'redux'


function Dashboard({ groups }) {

  const [ selectedGroupId, setSelectedGroupId ] = useState();


  // useFirestoreConnect([
  //   { collection: 'groups' } // or 'todos'
  // ])
  // const groups = useSelector((state) => state.firestore.ordered.groups)

  // useFirebaseConnect ([
  //   'groups' // { path: '/todos' } // object notation
  // ])

  // const groups = useSelector((state) => {
  //   console.log(state)
  //   return state.firebase.ordered.groups})

  console.log(groups)

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Add user</h2>
              <Form>
                <Form.Control value={selectedGroupId} onChange={({ target }) => setSelectedGroupId(target.value)} as="select" size="10">
                  {groups?.map(gr => <option value={gr.id} key={gr.id}>{gr.name}</option>)}
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
   groups: students.groups,
   selectedGroupId: students.selectedGroupId
});

const populates = [
  { child: 'students', root: 'students' }
]

const enhance = compose(
  firebaseConnect([
    { path: 'groups', populates }
  ]),
  connect(
    ({ firebase }) => ({
      groups: populate(firebase, 'ordered/groups', populates),
    })
  )  
)

export default enhance(Dashboard)

// const enhance = compose(
//   firebaseConnect([
//     'groups' // sync /todos from firebase into redux
//   ]),
//   connect((state) => ({
//     groups: state.firebase.ordered.groups
//   }))
// )

// export default enhance(Dashboard)

// export default Dashboard