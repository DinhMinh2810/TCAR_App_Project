import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import CarProductCard from './CarProductCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const dispatch = useDispatch();
	const { cars, error } = useSelector((state) => state.carsProduct);
	const [keyword, setKeyword] = useState('');
	let navigate = useNavigate();
	
	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/carProduct/${keyword}`);
		} else {
			navigate('/carProduct');
		}
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		dispatch(getCars());
	}, [dispatch, error]);

	return (
		<>
			<form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="Search a Product ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
			<div>
				{cars && cars.map((car) => <CarProductCard key={car._id} car={car} />)}
			</div>
		</>
	);
};

export default Home;
