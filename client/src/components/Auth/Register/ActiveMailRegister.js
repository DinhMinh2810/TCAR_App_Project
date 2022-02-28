import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { activeMailRegister } from '../../../redux/actions/authAction';
import './register.css';

const ActiveMailRegister = () => {
	const dispatch = useDispatch();
	const { activationToken } = useParams();
	useEffect(() => {
		dispatch(activeMailRegister(activationToken));
	}, [dispatch, activationToken]);

	return (
		<div className="active_page">
			<h1 className="active_text_mail">Register your account success !!</h1>
		</div>
	);
};

export default ActiveMailRegister;
