import React from 'react';

const UserListItemAdd = ({ user, handleFunction }) => {
	return (
		<>
			<div className="p-2">
				<div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
					<span className="inline-flex px-2">{user.name}</span>
					<button
						className="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center"
						onClick={handleFunction}
					>
						Remove
					</button>
				</div>
			</div>
		</>
	);
};

export default UserListItemAdd;
