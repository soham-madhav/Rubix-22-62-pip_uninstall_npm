import React from 'react';
import NavigationBar from "../Navbar/Navbar";
import {Card, Col, Container, Row} from 'react-bootstrap'
import WeeklyChart from './charts/WeeklyChart.js'
import QuaterlyChart from './charts/QuaterlyChart';
import MonthlyChart from './charts/MonthlyChart';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './dashboardStyle.css'



const Dashboard = () => {
    return (
        <div>
            <NavigationBar />
            <Container >
                <Row><h2>Analysis</h2></Row>
                <Row className="row justify-content-md-center">
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-center justify-content-center">
                        <Card style={{height:'fit-content', width:'250px', marginBottom:'30px', padding:'20px'}}>
                            <h5>Income:</h5>
                            <ProgressBar now={80} />
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-center justify-content-center">
                        <Card style={{height:'fit-content', width:'250px', marginBottom:'30px', padding:'20px'}}>
                            <h5>Expense:</h5>
                            <ProgressBar now={80} />
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-center justify-content-center">
                        <Card style={{height:'fit-content', width:'250px', marginBottom:'30px', padding:'20px'}}>
                            <h5>Budget:</h5>
                            <ProgressBar now={80} />
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="d-flex align-items-center justify-content-center">
                        <Card style={{height:'fit-content', width:'250px', marginBottom:'30px', padding:'20px'}}>
                            <h5>Invested:</h5>
                            <ProgressBar now={80} />
                        </Card>
                    </Col>
                    
                </Row>
                <br />
                <Row className="row justify-content-md-center" >
                    <Col xs={12} lg={4} md={6}  >
                    <Card style={{height:'fit-content', width:'fit-content', padding:'20px'}} >
                        <h4>Weekly Analysis</h4>
                        <WeeklyChart />
                    </Card>
                    </Col>
                    <Col xs={12} lg={4} md={6} >
                    <Card style={{height:'fit-content', width:'fit-content', padding:'20px'}}>
                        <h4>Monthly Analysis</h4>
                        <MonthlyChart />
                    </Card>
                    </Col>
                    <Col xs={12} lg={4} md={6}  >
                    <Card style={{height:'fit-content', width:'fit-content', padding:'20px'}}>
                        <h4>Quarterly Analysis</h4>
                        <QuaterlyChart />
                    </Card>
                    </Col>
                </Row>
            
            </Container>
            
            
        </div>
    )
}

export default Dashboard