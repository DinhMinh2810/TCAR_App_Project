import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Check authentication

const ProtectedRoute = ({ isAdmin, children }) => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);

	return (
		<Fragment>
			{loading === false &&
				(isAuthenticated === false ? (
					<Navigate replace to="/login" />
				) : isAdmin === true && user.role !== 'admin' ? (
					<Navigate replace to="/login" />
				) : (
					children
				))}
		</Fragment>
	);
};

export default ProtectedRoute;
