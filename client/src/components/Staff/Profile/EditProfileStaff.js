import React from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import EditProfile from '../../User/EditProfile';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';

const EditProfileStaff = () => {
	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Edit profile Staff" />
			<>
				<EditProfile />
			</>
		</div>
	);
};

export default EditProfileStaff;
