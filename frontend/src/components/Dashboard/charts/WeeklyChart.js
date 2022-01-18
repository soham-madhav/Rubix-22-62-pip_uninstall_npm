import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklyChart = () => {
    const [foodCount, setfoodCount] = useState(4);
    const [entertainmentCount, setentertainmentCount] = useState(8);
    const [medicalCount, setmedicalCount] = useState(1);
    const [randomCount, setrandomCount] = useState(2);
    const [dailyCount, setdailyCount] = useState(10)

    const data = {
        labels: ['Food', 'Entertainment', 'Medical', 'Random', 'Daily'],
        datasets: [
            {
                label: '# of Votes',
                data: [foodCount, entertainmentCount, medicalCount, randomCount, dailyCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data} />;
        </div>
    )
}

export default WeeklyChart








