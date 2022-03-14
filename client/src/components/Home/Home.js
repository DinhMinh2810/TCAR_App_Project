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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Home = () => {
	const dispatch = useDispatch();
	const { cars, error } = useSelector((state) => state.carsProduct);
	const [keyword, setKeyword] = useState('');
	let navigate = useNavigate();

	const locations = [
		'Da Nang',
		'Ha Noi',
		'Ho Chi Minh',
		'Can Tho',
		'Ca Mau',
		'Hai Phong',
		'Gia Lai',
		'Quang Nam',
	];

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
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getCars());
	}, [dispatch, error]);

	const disablePastDate = () => {
		const today = new Date().toISOString().slice(0, 16);
		return today;
	};

	return (
		<>
			<TitleBarPage title="Home" />
			{/* <div>
				<div className="py-16 bg-gradient-to-b from-indigo-700 to-indigo-600 flex justify-center items-center">
					<div>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-10 text-white">
							How can we help you?
						</h1>
						<div className="bg-indigo-800 rounded relative mt-6 lg:mt-14 py-4 pl-4 flex items-center w-full flex-col">
							<div>
								
							</div>
						</div>
					</div>
				</div>
			</div> */}
			<div class="h-50 bg">
				<div class="container h-screen mx-auto flex justify-center items-center md:p-0">
					<div class="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-20">
						<div class="flex justify-center">
							<p class="font-bold text-2xl">
								TCAR - always with you on every journey
							</p>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div class="grid grid-cols-1 gap-2 border border-gray-200 p-2 rounded">
								<div class="flex items-center ">
									<p>Start Day</p>
								</div>
								<div class="flex border rounded bg-gray-300 items-center p-2 ">
									<AccessTimeIcon class="fill-current text-gray-800 mr-2 w-5" />

									<input
										type="datetime-local"
										min={disablePastDate()}
										class="bg-gray-300 max-w-full focus:outline-none text-gray-700"
									/>
								</div>
								<div class="flex items-center ">
									<p>End Day</p>
								</div>
								<div class="flex border rounded bg-gray-300 items-center p-2 ">
									<AccessTimeIcon class="fill-current text-gray-800 mr-2 w-5" />
									<input
										type="datetime-local"
										min={disablePastDate()}
										class="bg-gray-300 max-w-full focus:outline-none text-gray-700"
									/>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-2 border border-gray-200 p-2 rounded">
								<div class="flex border rounded bg-gray-300 items-center justify-center py-2 px-6 ">
									<LocationOnIcon class="fill-current text-gray-800 mr-2 w-5" />

									<select class="bg-gray-300 max-w-full focus:outline-none text-gray-700 border border-black p-2 rounded">
										<option value="">Choose location</option>
										{locations.map((local) => (
											<option key={local} value={local}>
												{local}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div class="flex justify-center">
							<button class="p-2 border w-1/4 rounded-md bg-gray-800 text-white">
								Search
							</button>
						</div>
					</div>
				</div>
			</div>

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
