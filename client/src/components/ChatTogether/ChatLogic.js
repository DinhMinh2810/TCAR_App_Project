export const getSender = (loggedUser, users) => {
	// console.log('====================================');
	// console.log(users[0]._id);
	// console.log('====================================');
	if (users[0]._id === loggedUser?._id) {
		return users[1]?.name;
	} else {
		return users[0]?.name;
	}
	// return users[0]._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (loggedUser, users) => {
	return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};
