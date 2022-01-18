import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import NavigationBar from '../Navbar/Navbar'
import Reminder from './Reminder'
import { useState } from 'react'

const data = [{
    "id": 1,
    "task": "Give dog a bath",
    "date": Date("25 January 2022"),
    "amount": 2000,
    "complete": true
  }, {
    "id": 2,
    "task": "Do laundry",
    "date": Date("26 January 2022"),
    "amount": 2500,
    
    "complete": true
  }, {
    "id": 3,
    "task": "Vacuum floor",
    "date": Date("28 January 2022"),
    "amount": 100,
    
    "complete": false
  }, {
    "id": 4,
    "task": "Feed cat",
    "date": Date("25 Febuary 2022"),
    "amount": 5000,
    
    "complete": true
  }, {
    "id": 5,
    "task": "Change light bulbs",
    "date": Date("25 March 2022"),
    "amount": 3000,
    
    "complete": false
  }]

const Reminders = () => {
    const [reminders, setreminders] = useState(data);

    return (
        <div>
            <NavigationBar />
            <Container>
                
                <Row className="justify-content-center" style={{textAlign:'center', margin:'10px'}} >
                    <h3>Reminders</h3>
                </Row>
                {
                    reminders.map((reminder) => (
                        <Row className="justify-content-center" >
                            <Reminder data={reminder} />
                        </Row>
                    ))
                }
                
                

            </Container>
        </div>
    )
}

export default Reminders
