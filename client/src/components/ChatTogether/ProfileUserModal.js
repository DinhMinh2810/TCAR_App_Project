import React from 'react';

const ProfileUserModal = ({ user }) => {
	return (
		<div className="bg-white pt-20 pb-6 px-20 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
			<div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
				<img
					className="object-cover w-full h-full"
					src={user.avatar.url}
					alt=""
				/>
			</div>
			<div className="mt-16">
				<h1 className="text-xl text-center font-semibold">{user.name}</h1>
				<p className="text-lg text-gray-600 text-center">Email: {user.email}</p>
				<p className="text-base text-gray-600 text-center">Role: {user.role}</p>
			</div>
		</div>
	);
};

export default ProfileUserModal;
