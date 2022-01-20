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
    


const WeeklyChart = () => {
    //GET WEEKLY DATA
    const [apiData, setApiData] = useState([])
    const [foodCount, setfoodCount] = useState(0);
    const [entertainmentCount, setentertainmentCount] = useState(0);
    const [medicalCount, setmedicalCount] = useState(0);
    const [randomCount, setrandomCount] = useState(0);
    const [transportCount, setTransportCount] = useState(0)

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/getDateWiseSpendings/phoneNo=1/duration=week/')
      .then(result => {
        console.log("API RETURN: ",result.data);
        setApiData(result.data);
        setPieData(result.data);

      }).catch(e => {
        console.log(e);
      });

      console.log("Entries : ",Object.entries(apiData))

    }, []);
    
    const makeBarData = () => {
      const arr = [];
      Object.entries(apiData).forEach(function (key) {
        arr.push(key[1].FOOD)
      })
      console.log(arr)
    }
    

    const setPieData = (apiData) => {
      Object.entries(apiData).forEach(function(key) {
        if(key[1].FOOD){ setfoodCount((f)=> (f+(key[1].FOOD))) }
        if(key[1].Food){ setfoodCount((f)=> (f+(key[1].Food))) }
        
        if(key[1].ENTERTAINMENT){ setentertainmentCount((f)=> (f+key[1].ENTERTAINMENT)) }
        if(key[1].Entertainment){ setentertainmentCount((f)=> (f+key[1].Entertainment)) }
  
        if(key[1].MEDICAL){setmedicalCount((f)=> (f+(key[1].MEDICAL))) }
        if(key[1].Medical){setmedicalCount((f)=> (f+(key[1].Medical))) }
  
        if(key[1].RANDOM){ setrandomCount((f)=> (f+(key[1].RANDOM))) }
        if(key[1].Random){ setrandomCount((f)=> (f+(key[1].Random))) }
  
        if(key[1].TRANSPORT){ setTransportCount((f)=> (f+(key[1].TRANSPORT))) }
        if(key[1].Transport){ setTransportCount((f)=> (f+(key[1].Transport))) }
  
        
      });



    }

   

    
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
    



    
    const bardata = {
        labels: Object.keys(apiData) ,
        datasets: [
          {
            label: 'Food',
            data: makeBarData() ,
            backgroundColor: '#1bafd0',
          },
          {
            label: 'Entertainment',
            data: [65, 9, 90, 81, 56, 55, 40],
            backgroundColor: '#fd636b',
          },
          {
            label: 'Medical',
            data: [65, 9, 90, 81, 56, 55, 40],
            backgroundColor: '#ffb900',
          },{
            label: 'Random',
            data: [65, 9, 90, 81, 56, 55, 40],
            backgroundColor: '#3be8b0',
          },{
            label: 'Transport',
            data: [65, 9, 90, 81, 56, 55, 40],
            backgroundColor: '#6967ce',
          },
        ]
    }

    const linedata = {
        labels:["Sat","Sun","Mon","Tue","Wed","Thur","Fri"],
        datasets: [
          {
            label: 'Food',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#1bafd0',
            tension: 0.1
          }, 
          {
            label: 'Entertainment',
            data: [95, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#fd636b',
            tension: 0.1
          },{
            label: 'Random',
            data: [25, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#ffb900',
            tension: 0.1
          },{
            label: 'Medical',
            data: [55, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#3be8b0',
            tension: 0.1
          },
          {
            label: 'Transport',
            data: [50, 59, 80, 81, 56, 55, 40],
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
                <Doughnut data={piedata} />;
            </Col>
            <Col lg={6} md={12}>
                <Bar options={options} data={bardata} height="300px" />;
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

export default WeeklyChart








