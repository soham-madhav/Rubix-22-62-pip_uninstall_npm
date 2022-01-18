import React from 'react'
import { Card, Button } from 'react-bootstrap'


const Reminder = ({data}) => {
    return (
        <>
        <Card style={{width: '80%'}}>
            <Card.Body>
                <div style={{display:'inline-block'}}>
                    <Card.Title>{data.task}</Card.Title>
                    <Card.Text>
                        <div>Due date: {data.date}</div>
                        <div>Amount: ₹ {data.amount}</div>
                    </Card.Text>
                </div>
                <div style={{float:'right'}}>
                    <Button variant="primary">Delete</Button>
                </div>
                
            </Card.Body>
            
        </Card>
        </>
    )
}

export default Reminder
