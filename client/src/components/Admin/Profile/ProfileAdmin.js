import React from 'react';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import TitleBarPage from '../../Layout/TitleBarPage';
import Profile from '../../User/Profile';

const ProfileAdmin = () => {
	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Profile Admin" />
			<>
				<Profile />
			</>
		</div>
	);
};

export default ProfileAdmin;
