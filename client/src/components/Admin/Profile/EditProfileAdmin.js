import React from 'react';
import TitleBarPage from './../../Layout/TitleBarPage';
import HeaderBarAdmin from './../HeaderBarAdmin/HeaderBarAdmin';
import EditProfile from './../../User/EditProfile';

const EditProfileAdmin = () => {
	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Edit profile Admin" />
			<>
				<EditProfile />
			</>
		</div>
	);
};

export default EditProfileAdmin;
