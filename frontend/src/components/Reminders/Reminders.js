import React from 'react'
import { Container, Card, Row, Col, Button, Modal, FormControl, Form, Tabs, Tab } from 'react-bootstrap'
import NavigationBar from '../Navbar/Navbar';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';


// const data = [{
//   "id": 1,
//   "task": "Give dog a bath",
//   "date": Date("25 January 2022"),
//   "amount": 2000,
//   "type": 'Send',
//   "complete": true
// }, {
//   "id": 2,
//   "task": "Do laundry",
//   "date": Date("26 January 2022"),
//   "amount": 2500,
//   "type": 'Send',
//   "complete": true
// }, {
//   "id": 3,
//   "task": "Vacuum floor",
//   "date": Date("28 January 2022"),
//   "amount": 100,
//   "type": 'Recieve',
//   "complete": false
// }, {
//   "id": 4,
//   "task": "Feed cat",
//   "date": Date("25 Febuary 2022"),
//   "amount": 5000,
//   "type": 'Send',
//   "complete": true
// }, {
//   "id": 5,
//   "task": "Change light bulbs",
//   "date": Date("25 March 2022"),
//   "amount": 3000,
//   "type": 'Recieve',
//   "complete": false
// }]

const Reminders = () => {
/*   const {phone} = useParams();
 */  const phone =2;
  const [reminders, setreminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showAutopayModal, setShowAutopayModal] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");


  useEffect(()=>{
    getApiData();
  },[]);

  function addReminder(e) {
    e.preventDefault();
    const data = { 
      phoneNo: phone,
      senderPhoneNo: "2",
      walletTransaction: "true",
      transactionDescription: task,
      transactionAmount: amount,
      transactionCategory: "",
      transactionType: "CR",
      reminderType: "AutoPay"
  }
  axios.post("http://localhost:8000/requestMoney/", JSON.stringify(data)).then(result => {
      console.log(result);
  }).catch(e => {
      console.log(e);
  });
  }

  function deleteReminder() {
    console.log("Delete reminder called");
  }

  async function getApiData() {
    axios.get(`http://localhost:8000/getReminders/phoneNo=${phone}/`)
      .then(result => {
        setreminders(result.data);
        console.log(result);
      }).catch(e => {
        console.log(e);
      });
  }

  function handleCloseReminderModal() {
    setShowReminderModal(false);
    
  }
  function handleCloseAutopayModal() {
    setShowAutopayModal(false);
  }

  return (
    <div>
      {/* <Modal show={showModal} onHide={handleClose}>
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
      </Modal> */}
      <Modal show={showReminderModal} onHide={handleCloseReminderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addReminder}>
            <FormControl required placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
            <FormControl required type="date" placeholder="Enter Date" onChange={(e) => setDate(e.target.value)} />
            <FormControl placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
            <FormControl placeholder="Enter Type" onChange={(e) => setType(e.target.value)} />                                
            <Button variant="info" type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/*-----------------------------------------------*/}
      <Modal show={showAutopayModal} onHide={handleCloseAutopayModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Autopay Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={addReminder}>
          <FormControl required placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
          <FormControl required type="date" placeholder="Enter Repeat Date" onChange={(e) => setDate(e.target.value)} />
          <FormControl placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
          <Button type="submit">Save</Button> 
          <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>


      {/*-----------------------------------------------*/}

      <NavigationBar />
      {/* <Container>
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
                    <Card.Title>{reminder.reminderTitle}</Card.Title>
                    <Card.Text>
                      <div>Due date: {reminder.reminderTimeStamp}</div>
                      <div>{reminder.reminderType}  Amount: ₹ {reminder.reminderAmount}</div>
                      <div>Description: {reminder.reminderDescription}</div>
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
      </Container> */}
      <Container style={{padding:'10px'}} >
          <Row>
                <Tabs style={{padding:'0 50px 0 50px'}} defaultActiveKey="reminders" id="uncontrolled-tab-example" className="tab">
                    <Tab eventKey="reminders" title="Reminders"  >
                        <Row className="justify-content-center" style={{ textAlign: 'center', margin: '10px' }} >
                            <Col xs={12} md={6}>
                              <h3>Reminders</h3>
                            </Col>
                            <Col xs={12} md={6}>
                              <Button variant="info" onClick={() => setShowReminderModal(true)} style={{ width: '40%' }}> Add Reminder</Button>
                            </Col>
                        </Row>
                        {
                        reminders.map((reminder) => (

                        // reminders.filter((x)=> x.reminderType=="Reminder").map((reminder) => (
                            <Row className="justify-content-center" >
                              <Card style={{ width: '80%' }}>
                                <Card.Body>
                                  <div style={{ display: 'inline-block' }}>
                                    <Card.Title>{reminder.reminderTitle}</Card.Title>
                                    <Card.Text>
                                      <div>Due date: {new Date(reminder.reminderTimeStamp).toDateString()}</div>
                                      <div>Send  Amount: ₹ {reminder.reminderAmount}</div>
                                      <div>Description : {reminder.description}</div>

                                    </Card.Text>
                                  </div>
                                  <div style={{ float: 'right', color:'white' }}>
                                    <Button variant="light" onClick={deleteReminder} >Delete</Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Row>
                          ))
                        }
                        <br />
                    </Tab>
                    <Tab eventKey="autopay" title="Autopay"  >
                        <Row className="justify-content-center" style={{ textAlign: 'center', margin: '10px' }} >
                            <Col xs={12} md={6}>
                              <h3>Autopay</h3>
                            </Col>
                            <Col xs={12} md={6}>
                              <Button variant="info" onClick={() => setShowAutopayModal(true)} style={{ width: '40%' }}> Add Autopay Reminder</Button>
                            </Col>
                        </Row>
                        {
                          reminders.filter((x)=> x.reminderType== "AutoPay").map((reminder) => (
                            <Row className="justify-content-center" >
                              <Card style={{ width: '80%' }}>
                                <Card.Body>
                                  <div style={{ display: 'inline-block' }}>
                                    <Card.Title>{reminder.task}</Card.Title>
                                    <Card.Text>
                                    <div>Repeat date: {new Date(reminder.reminderTimeStamp).toDateString()}</div>
                                    <div>Send  Amount: ₹ {reminder.reminderAmount}</div>
                                    <div>Description : {reminder.description}</div>

                                    </Card.Text>
                                  </div>
                                  <div style={{ float: 'right' }}>
                                    <Button  variant="light" onClick={deleteReminder} >Delete</Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Row>
                          ))
                        }
                        <br />
                    </Tab>
                      
                </Tabs>
          </Row>
              
      </Container>

      <br />`
    </div >
  )
}

export default Reminders
