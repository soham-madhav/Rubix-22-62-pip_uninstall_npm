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

const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];




const MonthlyChart = () => {

  //GET MONTHLY DATA

  const [foodCount, setfoodCount] = useState(14);
  const [entertainmentCount, setentertainmentCount] = useState(4);
  const [medicalCount, setmedicalCount] = useState(5);
  const [randomCount, setrandomCount] = useState(4);
  const [transportCount, setTransportCount] = useState(20);

  //get data
  /* const [apiData, setApiData] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getTransactions/phoneNo=1/timeDuration=31')
    .then(result => {
      console.log(result.data);
      setApiData(result.data)
    }).catch(e => {
      console.log(e);
    });
  }, [])

  useEffect(() => {
    const fa = apiData.filter((t) => t.transactionCategory=="Food" || t.transactionCategory=="FOOD" );
    setfoodCount(fa.length)
    console.log('Food: ',foodCount)

    const ea = apiData.filter((t) => t.transactionCategory=="Entertainment" || t.transactionCategory=="ENTERTAINMENT" );
    setentertainmentCount(ea.length)
    console.log('enter', entertainmentCount)

    const ma = apiData.filter((t) => t.transactionCategory=="Medical" || t.transactionCategory=="MEDICAL" );
    setmedicalCount(ma.length)
    console.log(medicalCount)

    const ra = apiData.filter((t) => t.transactionCategory=="Random" || t.transactionCategory=="RANDOM" );
    setrandomCount(ra.length)
    console.log(randomCount)

    const ta = apiData.filter((t) => t.transactionCategory=="Transport" || t.transactionCategory=="TRANSPORT" );
    setTransportCount(ta.length)
    console.log(transportCount)

    console.log( "days: ", apiData.map((t) => ( new Date(t.transactionTimeStamp).getDay()) ))
    const weekData = apiData.filter((t) => (new Date(t.transactionTimeStamp))>=(new Date("2022-01-15")) )
    console.log("weekdata :",weekData);


  }, [apiData]);

 */


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
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    datasets: [
      {
        label: 'Food',
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        backgroundColor: '#1bafd0',
      },
      {
        label: 'Entertainment',
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        backgroundColor: '#fd636b',
      },
      {
        label: 'Medical',
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        backgroundColor: '#ffb900',
      },{
        label: 'Random',
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,2,3,4,5,6,7,8,9,10],
        backgroundColor: '#3be8b0',
      },{
        label: 'Transport',
        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,6,7,8,9,10,11,12,4,25,26,27,28,29,30,31],
        backgroundColor: '#6967ce',
      },
    ]
}

const linedata = {
  labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
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
