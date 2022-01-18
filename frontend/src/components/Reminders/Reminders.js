import React from 'react'
import { Container, Card, Row, Col, Button, Modal, FormControl, Form } from 'react-bootstrap'
import NavigationBar from '../Navbar/Navbar';
import { useState } from 'react'
import axios from 'axios'

const data = [{
  "id": 1,
  "task": "Give dog a bath",
  "date": Date("25 January 2022"),
  "amount": 2000,
  "type": 'Send',
  "complete": true
}, {
  "id": 2,
  "task": "Do laundry",
  "date": Date("26 January 2022"),
  "amount": 2500,
  "type": 'Send',
  "complete": true
}, {
  "id": 3,
  "task": "Vacuum floor",
  "date": Date("28 January 2022"),
  "amount": 100,
  "type": 'Recieve',
  "complete": false
}, {
  "id": 4,
  "task": "Feed cat",
  "date": Date("25 Febuary 2022"),
  "amount": 5000,
  "type": 'Send',
  "complete": true
}, {
  "id": 5,
  "task": "Change light bulbs",
  "date": Date("25 March 2022"),
  "amount": 3000,
  "type": 'Recieve',
  "complete": false
}]

const Reminders = () => {
  const [reminders, setreminders] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  function addReminder(e) {
    e.preventDefault();
    const data = { task, date, amount, type };
    console.log(data);
    axios.post()
      .then(result => {
        getApiData();
        console.log(result);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function deleteReminder() {
    console.log("Delete reminder called");
  }

  function getApiData() {
    axios.get()
      .then(result => {
        console.log(result);
      }).catch(e => {
        console.log(e);
      });
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addReminder}>
            <FormControl required placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
            <FormControl required type="date" placeholder="Enter Date" onChange={(e) => setDate(e.target.value)} />
            <FormControl placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
            <FormControl placeholder="Enter Type" onChange={(e) => setType(e.target.value)} />
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center" style={{ textAlign: 'center', margin: '10px' }} >
          <Col xs={12} md={6}>
            <h3>Reminders</h3>
          </Col>
          <Col xs={12} md={6}>
            <Button onClick={() => setShowModal(true)} style={{ width: '30%' }}> Add Reminder</Button>
          </Col>
          
        </Row>
        {
          reminders.map((reminder) => (
            <Row className="justify-content-center" >
              <Card style={{ width: '80%' }}>
                <Card.Body>
                  <div style={{ display: 'inline-block' }}>
                    <Card.Title>{reminder.task}</Card.Title>
                    <Card.Text>
                      <div>Due date: {reminder.date}</div>
                      <div>{reminder.type}  Amount: ₹ {reminder.amount}</div>
                    </Card.Text>
                  </div>
                  <div style={{ float: 'right' }}>
                    <Button onClick={deleteReminder} variant="primary">Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Row>
          ))
        }
        <br />
        
      
      </Container>
      <br />
    </div >
  )
}

export default Reminders
