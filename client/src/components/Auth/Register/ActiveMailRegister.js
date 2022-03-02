import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeMailRegister } from '../../../redux/actions/authAction';

const ActiveMailRegister = () => {
	const dispatch = useDispatch();
	const { activationToken } = useParams();
	useEffect(() => {
		dispatch(activeMailRegister(activationToken));
	}, [dispatch, activationToken]);

	return (
		<div className="bg-white px-3 md:px-4 py-12 flex flex-col justify-center items-center">
			<h1 className="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-center text-gray-800 text-center md:w-9/12 lg:w-7/12">
				Register your account successfully !!
			</h1>
			<p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12">
				Welcome to Tourist car rental service 🤣🥰
			</p>
			<div className="mt-12 md:mt-14 w-full flex justify-center">
				<Link to="/" className="w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white">
					Go home page
				</Link>
			</div>
		</div>
	);
};

export default ActiveMailRegister;
