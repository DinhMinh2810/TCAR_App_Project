import React from 'react';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import './dashboard.css';
import TitleBarPage from '../../Layout/TitleBarPage';

const Dashboard = () => {
	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<div className="dashboardContainer">
				<h1>Dashboard</h1>

				<TitleBarPage title="Dashboard Admin" />
			</div>
		</div>
	);
};

export default Dashboard;
