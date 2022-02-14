import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import CarProduct from './CarProduct';
import { toast } from 'react-toastify';

const Home = () => {
	const dispatch = useDispatch();
	const { cars, error } = useSelector((state) => state.carsProduct);
	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		dispatch(getCars());
	}, [dispatch, error]);

	return (
		<>
			<div>
				{cars && cars.map((car) => <CarProduct key={car._id} car={car} />)}
			</div>
		</>
	);
};

export default Home;
