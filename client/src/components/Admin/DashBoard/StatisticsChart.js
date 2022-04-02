import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	YAxis,
} from 'recharts';

const StatisticsChart = ({
	books,
	totalMonth1,
	totalMonth2,
	totalMonth3,
	totalMonth4,
	totalMonth5,
	totalMonth6,
	totalMonth7,
	totalMonth8,
	totalMonth9,
	totalMonth10,
	totalMonth11,
	totalMonth12,
}) => {
	const data = [
		{
			month: 'Jan',
			'Total Amount': totalMonth1,
		},
		{
			month: 'Feb',
			'Total Amount': totalMonth2,
		},
		{
			month: 'Mar',
			'Total Amount': totalMonth3,
		},
		{
			month: 'Apr',
			'Total Amount': totalMonth4,
		},
		{
			month: 'May',
			'Total Amount': totalMonth5,
		},
		{
			month: 'Jun',
			'Total Amount': totalMonth6,
		},
		{
			month: 'Jul',
			'Total Amount': totalMonth7,
		},
		{
			month: 'Agu',
			'Total Amount': totalMonth8,
		},
		{
			month: 'Sep',
			'Total Amount': totalMonth9,
		},
		{
			month: 'Oct',
			'Total Amount': totalMonth10,
		},
		{
			month: 'Nov',
			'Total Amount': totalMonth11,
		},
		{
			month: 'Dec',
			'Total Amount': totalMonth12,
		},
	];
	return (
		<>
			<div>
				<h3 className="chartTitle">
					Statistics of total rent per month in 2022 💰💰
				</h3>
				<ResponsiveContainer width="100%" className="pt-4" aspect={4 / 1}>
					<LineChart data={data}>
						<XAxis dataKey="month" stroke="#5550bd" />
						<YAxis dataKey="Total Amount" />
						<Line type="monotone" dataKey="Total Amount" stroke="#5550bd" />
						<Tooltip />
						<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default StatisticsChart;
