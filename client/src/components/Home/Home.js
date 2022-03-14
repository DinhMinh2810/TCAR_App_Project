import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import CarProductCard from './CarProductCard';
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import TitleBarPage from '../Layout/TitleBarPage';
import Partner from './Partner';
import Blog from './Blog';
import GuideRental from './GuideRental';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import './home.css';
import Search from './Search';

const Home = () => {
	const dispatch = useDispatch();
	const { cars, error } = useSelector((state) => state.carsProduct);
	let navigate = useNavigate();



	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getCars());
	}, [dispatch, error]);

	return (
		<>
			<TitleBarPage title="Home" />
			<Search />

			{/* Car product */}
			<div className="bg-white">
				<div className="max-w-2xl mx-auto pb-16 pt-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
						Featured Cars - Self Driving Cars <ElectricCarIcon />
						<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
							{cars &&
								cars.map((car) => <CarProductCard key={car._id} car={car} />)}
						</div>
					</h2>
				</div>
			</div>

			<GuideRental />

			<Blog />
			<Partner />

			{/* <form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="Search a Product ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
			<div>
				{cars && cars.map((car) => <CarProductCard key={car._id} car={car} />)}
			</div> */}
		</>
	);
};

export default Home;
