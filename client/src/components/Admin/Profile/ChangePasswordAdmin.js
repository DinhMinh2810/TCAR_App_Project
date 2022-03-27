import React from 'react';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import TitleBarPage from './../../Layout/TitleBarPage';
import ChangePassword from './../../User/ChangePassword';

const ChangePasswordAdmin = () => {
	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Change pw admin" />
			<>
				<ChangePassword />
			</>
		</div>
	);
};

export default ChangePasswordAdmin;
