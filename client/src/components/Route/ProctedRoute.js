import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Check authentication

const ProtectedRoute = ({ isAdmin, children }) => {
	const auth = useSelector((state) => state.auth);
	

	return (
		<Fragment>
			
		</Fragment>
	);
};

export default ProtectedRoute;
