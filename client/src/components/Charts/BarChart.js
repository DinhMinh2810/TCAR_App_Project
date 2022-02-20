import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = () => {
	const [chart, setChart] = useState({});
	useEffect(() => {
		const fetchCoins = async () => {
			const { data } = await axios.get('/api/cars/getAdAllCars');

			setChart(data);
		};
		fetchCoins();
	}, []);
	console.log('chart', chart);

	var data = {
		labels: chart?.cars?.map((x) => x.name),
		datasets: [
			{
				label: `${chart?.cars?.length} Coins Available`,
				data: chart?.cars?.map((x) => x.rentPerDay),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
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

	var options = {
		maintainAspectRatio: false,
		scales: {},
		legend: {
			labels: {
				fontSize: 25,
			},
		},
	};
	return (
		<div>
			<Line data={data} height={400} options={options} />
		</div>
	);
};

export default BarChart;
