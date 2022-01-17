import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';

const Header = () => {
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();

	const logoutSubmit = () => {
		dispatch(logout(token));
	};

	return (
		<div>
			<h1>Header</h1>

			<button onClick={logoutSubmit}>Logout</button>
		</div>
	);
};

export default Header;
