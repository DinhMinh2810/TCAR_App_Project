import React from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import Profile from '../../User/Profile';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';

const ProfileStaff = () => {
	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Profile Staff" />
			<>
				<Profile />
			</>
		</div>
	);
};

export default ProfileStaff;
