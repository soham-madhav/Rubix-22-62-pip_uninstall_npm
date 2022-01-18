import React from 'react'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend);


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

const data = {
  labels,
  datasets: [
    {
      label: 'Spent',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Recieved',
      data: [65, 9, 90, 81, 56, 55, 40],
      backgroundColor: 'rgba(53, 162, 235, 1)',
    },
  ],
};

const MonthlyChart = () => {
  return (
    <div>
      <Bar options={options} data={data} />;
    </div>
  )
}

export default MonthlyChart
