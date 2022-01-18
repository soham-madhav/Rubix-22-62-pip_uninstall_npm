import React from 'react'
import NavigationBar from '../Navbar/Navbar'
import { Row, Col, Card, Form, Table, FormControl } from 'react-bootstrap'
import { useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([
    {
      id: "1",
      item: "Pizza",
      amount: 200,
      category: "Food"
    }
  ])

  return (
    <div>
      <NavigationBar />
      <Row className="justify-content-center">
        <Col lg={6} md={6}>
          <Card style={{ height: '70vh', margin: '30px', padding: '20px' }}>
            SCAN YO BILL
          </Card>
        </Col>
        <Col lg={6} md={6}>
          <Card style={{ height: '70vh', margin: '30px', padding: '20px' }}>
            <div>
              Sender/Reciever :
              <input type="text" style={{ margin: '10px', width: '50%' }} ></input>
            </div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.item}</td>
                      <td>{item.amount}</td>
                      <td>{item.category}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td colSpan={2} >Total amount:</td>
                  <td>5000</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

export default Home
