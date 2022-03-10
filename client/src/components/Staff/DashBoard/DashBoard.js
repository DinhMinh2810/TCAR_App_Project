import React from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';

const DashBoard = () => {
	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Dashboard Staff" />
			<div>dashboard staff</div>
		</div>
	);
};

export default DashBoard;
