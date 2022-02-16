import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activeMailRegister } from '../../../redux/actions/authAction';

const ActiveMailRegister = () => {
	const dispatch = useDispatch();
	// const { error } = useSelector((state) => state.auth);
	const { activationToken } = useParams();



	useEffect(() => {
		dispatch(activeMailRegister(activationToken));
	}, [dispatch, activationToken]);

	return (
		<div className="active_page">
			<h1>create account success</h1>
		</div>
	);
};

export default ActiveMailRegister;
