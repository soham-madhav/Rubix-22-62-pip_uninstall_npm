import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import { CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {Row, Col} from 'react-bootstrap'

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
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];




const MonthlyChart = () => {
  const [foodCount, setfoodCount] = useState(14);
  const [entertainmentCount, setentertainmentCount] = useState(4);
  const [medicalCount, setmedicalCount] = useState(5);
  const [randomCount, setrandomCount] = useState(4);
  const [dailyCount, setdailyCount] = useState(20);


  const piedata = {
    labels: ['Food', 'Entertainment', 'Medical', 'Random', 'Transport'],
    datasets: [
        {
            label: '# of Votes',
            data: [foodCount, entertainmentCount, medicalCount, randomCount, dailyCount],
            backgroundColor: [
                'rgba(1, 83, 99,1)',
                'rgba(3, 143, 166,1)',
                'rgba(13, 202, 240,1)',
                'rgba(35, 186, 217,1)',
                'rgba(109, 203, 222,1)',
                'rgba(181, 226, 235,0.6)',
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
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Entertainment',
        data: [65, 9, 90, 81],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Medical',
        data: [65, 9, 90, 81],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },{
        label: 'Random',
        data: [65, 9, 90, 81],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },{
        label: 'Transport',
        data: [65, 9, 90, 81],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
      borderColor: '#ccc774',
      tension: 0.1
    }, 
    {
      label: 'Entertainment',
      data: [95, 59, 80, 81],
      fill: false,
      borderColor: '#c48a74',
      tension: 0.1
    },{
      label: 'Random',
      data: [25, 59, 80, 81],
      fill: false,
      borderColor: '#112774',
      tension: 0.1
    },{
      label: 'Medical',
      data: [55, 59, 80, 81],
      fill: false,
      borderColor: '#74a774',
      tension: 0.1
    },
    {
      label: 'Transport',
      data: [50, 59, 80, 81],
      fill: false,
      borderColor: '#742774',
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
