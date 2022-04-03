import React, { PureComponent } from 'react';
import {
	RadialBarChart,
	RadialBar,
	Legend,
	FunnelChart,
	ResponsiveContainer,
	LabelList,
	Funnel,
	BarChart,
	Tooltip,
	CartesianGrid,
	YAxis,
	XAxis,
	ComposedChart,
	Area,
	Bar,
	Line,
} from 'recharts';

const StaticLocationChart = ({
	totalDaNang,
	totalHaNoi,
	totalHoChiMinh,
	totalCanTho,
	totalCaMau,
	totalHaiPhong,
	totalGiaLai,
	totalQuangNam,
}) => {
	const data = [
		{
			Location: 'Da Nang',
			'Total Amount': totalDaNang,
		},
		{
			Location: 'Ha Noi',
			'Total Amount': totalHaNoi,
		},
		{
			Location: 'Ho Chi Minh',
			'Total Amount': totalHoChiMinh,
		},
		{
			Location: 'Can Tho',
			'Total Amount': totalCanTho,
		},
		{
			Location: 'Ca Mau',
			'Total Amount': totalCaMau,
		},
		{
			Location: 'Hai Phong',
			'Total Amount': totalHaiPhong,
		},
		{
			Location: 'Quang Nam',
			'Total Amount': totalQuangNam,
		},
	];

	return (
		<ComposedChart width={730} height={350} data={data}>
			<XAxis dataKey="Location" />
			<YAxis />
			<Tooltip />
			<Legend />
			<CartesianGrid stroke="#f5f5f5" />
			<Bar dataKey="Total Amount" barSize={20} fill="#8884d8" />
		</ComposedChart>
	);
};

export default StaticLocationChart;
