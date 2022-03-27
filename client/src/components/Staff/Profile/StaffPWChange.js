import React from 'react';
import ChangePassword from '../../User/ChangePassword';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from '../../Layout/TitleBarPage';

const StaffPWChange = () => {
	return (
		<div className="dashboard">
			<TitleBarPage title="Change password staff" />
			<HeaderBarStaff />
			<>
				<ChangePassword />
			</>
		</div>
	);
};

export default StaffPWChange;
