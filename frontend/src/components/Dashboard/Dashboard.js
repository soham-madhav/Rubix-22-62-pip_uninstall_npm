import React from 'react';
import NavigationBar from "../Navbar/Navbar";
import {Card, Col, Container, Row, Tabs, Tab} from 'react-bootstrap'
import WeeklyChart from './charts/WeeklyChart.js'
import QuaterlyChart from './charts/QuaterlyChart';
import MonthlyChart from './charts/MonthlyChart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './dashboardStyle.css'



const Dashboard = () => {
    return (
        <div>
            <NavigationBar />
            <Container >
                <Row style={{padding:'10px 10px 10px 0px'}}><h2>Analysis</h2></Row>
                <Row className="row justify-content-md-center">
                <Col xs={12} md={4} lg={3}>
                        <Row>
                            <Card style={{ height: 'fit-content', width: '100%', marginBottom: '30px', padding: '20px' }}>
                                <h5>Income:</h5>
                                <ProgressBar variant="info" now={80} />
                            </Card>
                        </Row>
                        <Row>
                            <Card style={{ height: 'fit-content', width: '100%', marginBottom: '30px', padding: '20px' }}>
                                <h5>Expense:</h5>
                                <ProgressBar variant="info"  now={80} />
                            </Card>
                        </Row>
                        <Row>
                            <Card style={{ height: 'fit-content', width: '100%', marginBottom: '30px', padding: '20px' }}>
                                <h5>Budget:</h5>
                                <ProgressBar variant="info" now={80} />
                            </Card>
                        </Row>
                        <Row>
                            <Card style={{ height: 'fit-content', width: '100%', marginBottom: '30px', padding: '20px' }}>
                                <h5>Income:</h5>
                                <ProgressBar variant="info" now={80} />
                            </Card>
                        </Row>
                    </Col>
                    <Col xs={12} md={8} lg={9}>
                        <Tabs  defaultActiveKey="weekly" id="uncontrolled-tab-example" className="tab">
                            <Tab eventKey="weekly" title="Weekly"  >
                                <Row>
                                    <Col md={12} lg={12} className="justify-content-center" >
                                    <Card className="justify-content-center" style={{width:'100%', backgroundColor:'transparent'}}> 
                                        <WeeklyChart />
                                    </Card>
                                    </Col> 
                                </Row>
                                
                              
                              
                            </Tab>
                            <Tab eventKey="monthly" title="Monthly">
                                <Row>
                                    <Col md={12} lg={12} style={{height:"350px"}} >
                                    <Card className="justify-content-center" style={{width:'100%', backgroundColor:'transparent'}}> 
                                        <MonthlyChart />
                                    </Card>
                                    </Col> 
                                </Row>
                            </Tab>
                            <Tab eventKey="quarterly" title="Quarterly" >
                                <Row>
                                    <Col md={12} lg={10} >
                                    <Card className="justify-content-center" style={{width:'100%', backgroundColor:'transparent'}}> 
                                        <QuaterlyChart />
                                    </Card>
                                    </Col> 
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>

                </Row>
            
            </Container>
            
            
        </div>
    )
}

export default Dashboard