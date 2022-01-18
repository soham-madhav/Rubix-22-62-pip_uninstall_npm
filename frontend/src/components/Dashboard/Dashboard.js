import React from 'react';
import NavigationBar from "../Navbar/Navbar";
import {Card, Container} from 'react-bootstrap'
import WeeklyChart from './charts/WeeklyChart.js'
import QuaterlyChart from './charts/QuaterlyChart';
import MonthlyChart from './charts/MonthlyChart';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';



const Dashboard = () => {
    return (
        <div>
            <NavigationBar />
            <Container>
            
            </Container>
            <Card style={{height:'500px', width:'500px'}}>
                <WeeklyChart />
            </Card>
            <Card style={{height:'500px', width:'500px'}}>
                <QuaterlyChart />
            </Card>
            <Card style={{height:'500px', width:'500px'}}>
                <MonthlyChart />
            </Card>
            <Card style={{height:'50px', width:'100px'}}>
                <ProgressBar now={80} style={{verticalAlign:'middle', lineHeight:'500px'}} />
            </Card>
            
        </div>
    )
}

export default Dashboard