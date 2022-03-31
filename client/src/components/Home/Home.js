import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarsHomePage, clearErrors } from '../../redux/actions/carAction';
import CarProductCard from './CarProductCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import TitleBarPage from '../Layout/TitleBarPage';
import Partner from './Partner';
import Blog from './Blog';
import GuideRental from './GuideRental';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import './home.css';
import Search from './Search';
import ChatBot from './ChatBot';

const Home = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { cars, error } = useSelector((state) => state.carsProduct);
	const { success } = useSelector((state) => state.createReview);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success(`Review successfully and see you later 💙💙`);
			dispatch({ type: 'CREATE_REVIEW_RESET' });
		}

		dispatch(getCarsHomePage());
	}, [dispatch, error, success]);

	return (
		<>
			<TitleBarPage title="Home" />
			<Search />

			{/* Car product */}
			<div className="bg-white">
				<div className="max-w-2xl mx-auto pb-16 pt-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
						<div className="flex justify-between">
							<p>
								Featured Cars - Self Driving Cars <ElectricCarIcon />
							</p>
							<Link
								to="/carProduct/refreshSearch"
								className="text-slate-700 text-lg"
							>
								See More <ReadMoreIcon />
							</Link>
						</div>

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
			{/* chatbot */}
			<ChatBot />
		
		</>
	);
};

export default Home;
