import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend );
ChartJS.register(
    CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend );


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};





const MonthlyChart = () => {
 //GET QUARTERLY DATA


  const [foodCount, setfoodCount] = useState(14);
  const [entertainmentCount, setentertainmentCount] = useState(4);
  const [medicalCount, setmedicalCount] = useState(5);
  const [randomCount, setrandomCount] = useState(4);
  const [transportCount, setTransportCount] = useState(20);

  //api data
  const [apiData, setApiData] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getQuarterlyData/phoneNo%3D1/')
    .then(result => {
      console.log(result.data);
      setApiData(result.data)
    }).catch(e => {
      console.log(e);
    });
  }, [])

  useEffect(() => {
    

  }, [apiData]);




  const piedata = {
    labels: ['Food', 'Entertainment', 'Medical', 'Random', 'Transport'],
    datasets: [
        {
            label: '# of Votes',
            data: [foodCount, entertainmentCount, medicalCount, randomCount, transportCount],
            backgroundColor: [
              '#1bafd0',
              '#fd636b',
              '#ffb900',
              '#3be8b0',
              '#6967ce',
              '#f03c29',
            ],
            borderWidth: 0,
        },
    ],
  };
  const bardata = {
    labels: ["Jan","Feb","Mar","Apr"],
    datasets: [
      {
        label: 'Food',
        data: [65, 59, 80, 81],
        backgroundColor: '#1bafd0',
      },
      {
        label: 'Entertainment',
        data: [65, 9, 90, 81],
        backgroundColor: '#fd636b',
      },
      {
        label: 'Medical',
        data: [65, 9, 90, 81],
        backgroundColor: '#ffb900',
      },{
        label: 'Random',
        data: [65, 9, 90, 81],
        backgroundColor: '#3be8b0',
      },{
        label: 'Transport',
        data: [65, 9, 90, 81],
        backgroundColor: '#6967ce',
      },
    ]
}

const linedata = {
  labels:["Jan","Feb","Mar","Apr"],
  datasets: [
    {
      label: 'Food',
      data: [65, 59, 80, 81],
      fill: false,
      borderColor: '#1bafd0',
      tension: 0.1
    }, 
    {
      label: 'Entertainment',
      data: [95, 59, 80, 81],
      fill: false,
      borderColor: '#fd636b',
      tension: 0.1
    },{
      label: 'Random',
      data: [25, 59, 80, 81],
      fill: false,
      borderColor: '#ffb900',
      tension: 0.1
    },{
      label: 'Medical',
      data: [55, 59, 80, 81],
      fill: false,
      borderColor: '#3be8b0',
      tension: 0.1
    },
    {
      label: 'Transport',
      data: [50, 59, 80, 81],
      fill: false,
      borderColor: '#6967ce',
      tension: 0.1
    }
  ]
}

  

  

  return (
      <div>
        <Row>
            <Col lg={6} md={12}>
                <Doughnut data={piedata} />
                <br />
            </Col>
            <Col lg={6} md={12}>
                <Bar options={options} data={bardata} height="300px" />
                <br />
            </Col>
            <br />
            <hr />
            <br />
            <Row>
                <Col lg={12} md={12}>
                    <Line options={options} data={linedata} />;
                </Col>
            </Row>
        </Row>  
      </div>
  )
}

export default MonthlyChart
