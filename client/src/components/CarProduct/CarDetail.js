import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getCarDetails } from '../../redux/actions/carAction';
import { useParams, useNavigate } from 'react-router-dom';
import { addCarsToCart } from '../../redux/actions/favoriteCartActions';
import Loader from '../Layout/Loader/Loader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Rating } from '@mui/material';
import moment from 'moment';
import Carousel from 'react-material-ui-carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import TitleBarPage from '../Layout/TitleBarPage';
import ReviewCar from './ReviewCar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { bookingCar } from './../../redux/actions/favoriteCartActions';

const CarDetail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { isLoggedIn } = useSelector((state) => state.auth);
	const { loading, car, error } = useSelector(
		(state) => state.carProductDetails
	);
	const [quantity, setQuantity] = useState(0);
	const [menu, setMenu] = useState(true);
	const [StartDay, setStartDay] = useState(car?.startDay);
	const [EndDay, setEndDay] = useState(car?.endDay);

	const options = {
		value: car?.ratings,
		readOnly: true,
		precision: 0.5,
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		getDaysQuantityRental(StartDay, EndDay);
		dispatch(getCarDetails(id));
	}, [dispatch, id, StartDay, EndDay, error]);

	const addToCartHandler = () => {
		if (isLoggedIn) {
			dispatch(addCarsToCart(id, quantity, StartDay, EndDay, car?.endDay));
			toast.success('Car added to your favorite cart !!');
		} else {
			toast.error('Please login to add car to your favorite cart !!');
		}
	};

	const bookCarHandler = () => {
		if (isLoggedIn) {
			dispatch(
				bookingCar({
					car: id,
					quantity,
					startDay: StartDay,
					endDay: EndDay,
					name: car?.name,
					seatsCategory: car?.seatsCategory,
					image: car?.images[0]?.url,
					rentPerDay: car?.rentPerDay,
					nameDriver: car?.assigns?.name,
					driverID: car?.assigns?.user,
					location: car?.location,
				})
			);
			navigate('/receiveCarTo');
		} else {
			toast.error('Please login to add car to book car !!');
		}
	};

	const disablePastDate = () => {
		const today = new Date().toISOString().slice(0, 16);
		return today;
	};

	const checkDates = (valueTo, startDay, endDay) => {
		const VALUETO = new Date(valueTo);
		const STARTDAY = new Date(startDay);
		const ENDDAY = new Date(endDay);
		const startDayFormal = moment(STARTDAY).format('MMMM Do YYYY, h:mm:ss a');
		const endDayFormal = moment(ENDDAY).format('MMMM Do YYYY, h:mm:ss a');
		if (VALUETO <= STARTDAY) {
			toast.error(
				`Only booked from date ${startDayFormal} to ${endDayFormal} !!`
			);
			return setStartDay('');
		}
		if (VALUETO >= ENDDAY) {
			toast.error(
				`Only booked from date ${startDayFormal} to ${endDayFormal} !!`
			);
			return setStartDay('');
		} else {
			return setStartDay(valueTo);
		}
	};

	const checkEndDates = (valueTo, startDay) => {
		const VALUETO = new Date(valueTo);
		const STARTDAY = new Date(startDay);

		if (VALUETO <= STARTDAY) {
			toast.error(`Must rent car at least 1 day !!`);
		} else {
			setEndDay(valueTo);
		}
	};

	const getDaysQuantityRental = (start, last) => {
		const date1 = new Date(start);
		const date2 = new Date(last);

		const oneDay = 24 * 60 * 60 * 1000;

		const diffTime = date2.getTime() - date1.getTime();

		const diffDays = Math.round(diffTime / oneDay);

		return setQuantity(diffDays);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 items-center">
					<div className="xl:w-2/6 lg:w-2/5 md:w-80 md:block ">
						<Carousel>
							{car?.images ? (
								car?.images?.map((item, i) => (
									<img
										className="w-full"
										key={item?.public_id}
										src={item?.url}
										alt={`${i} slide car`}
									/>
								))
							) : (
								<Loader />
							)}
						</Carousel>
					</div>

					<div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
						<TitleBarPage title="Car detail" />
						<div className="border-b border-gray-200 pb-6">
							<h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800">
								{car?.name}
							</h1>
						</div>
						<div className="py-4 border-b border-gray-200 flex items-center justify-between">
							<p className="text-base leading-4 text-gray-800">Name Driver</p>
							<div className="flex items-center justify-center">
								<p className="text-sm leading-none text-gray-600">
									{car?.assigns?.name}
								</p>
								<div className="w-6 h-6 ml-3 mr-4 cursor-pointer">
									<AccountCircleIcon />
								</div>

								<svg
									className="cursor-pointer"
									width="6"
									height="10"
									viewBox="0 0 6 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 1L5 5L1 9"
										stroke="#4B5563"
										strokeWidth="1.25"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div className="py-4 border-b border-gray-200 flex items-center justify-between">
							<p className="text-base leading-4 text-gray-800">Seat category</p>
							<div className="flex items-center justify-center">
								<p className="text-sm leading-none text-gray-600">
									{car?.seatsCategory}
								</p>
								<div className="w-6 h-6 ml-3 mr-4 cursor-pointer">
									<AirlineSeatReclineNormalIcon />
								</div>

								<svg
									className="cursor-pointer"
									width="6"
									height="10"
									viewBox="0 0 6 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 1L5 5L1 9"
										stroke="#4B5563"
										strokeWidth="1.25"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div className="py-4 border-b border-gray-200 flex items-center justify-between">
							<p className="text-base leading-4 text-gray-800">
								Start &#8594; end available time
							</p>
							<div className="flex items-center justify-center">
								<p className="text-sm leading-none text-gray-600">
									{moment(car?.startDay).format('LLL')}
									<span className="font-extrabold"> &#8594; </span>
									{moment(car?.endDay).format('LLL')}
								</p>
							</div>
						</div>
						<div className="py-4 border-b border-gray-200 flex items-center justify-between">
							<p className="text-base leading-4 text-gray-800 ">
								Choose day rental
							</p>
							<div className="flex items-center justify-center">
								<p>
									<input
										type="datetime-local"
										value={StartDay || ''}
										min={disablePastDate()}
										onChange={(e) =>
											checkDates(e.target.value, car?.startDay, car?.endDay)
										}
										className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
									<input
										type="datetime-local"
										value={EndDay || ''}
										min={disablePastDate()}
										onChange={(e) => checkEndDates(e.target.value, StartDay)}
										className="mt-2 p-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
								</p>
							</div>
						</div>

						<div className="py-4 border-b border-gray-200 flex items-center justify-between">
							<p className="text-base leading-4 text-gray-800">
								Number rental days
							</p>
							<div className="flex items-center justify-between">
								{isNaN(quantity) ? (
									<span className="px-4 text-base">0 days</span>
								) : (
									<span className="px-4 text-base">{quantity} days</span>
								)}
							</div>
						</div>

						<div>
							<p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
								Description: {car?.description}
							</p>
							<p className="text-base leading-4 mt-4 text-gray-600">
								Rent per day: $ {car?.rentPerDay} / day, {car?.location} City
							</p>
							<p className="text-base leading-4 mt-4 text-gray-600 flex items-center">
								Rating: <Rating {...options} />({car?.numOfReviews} Reviews)
							</p>
						</div>
						<div className="flex justify-around">
							<button
								className="mt-4 px-4 rounded-md text-white bg-red-500 hover:bg-red-400 text-base flex items-center justify-center leading-none py-3"
								onClick={addToCartHandler}
							>
								<FavoriteIcon className="mr-3" />
								<p>Add car to favorite cart</p>
							</button>
							{car?.available === 'isBooked' ? (
								<button
									onClick={() => {
										navigate('/carProduct/refreshSearch');
									}}
									className="mt-4 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-900 text-base flex items-center justify-center leading-none py-3"
								>
									<p>Car busy, please choose another car 🤣</p>
								</button>
							) : (
								<button
									onClick={bookCarHandler}
									className="mt-4 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-900 text-base flex items-center justify-center leading-none py-3"
								>
									<CarRentalIcon className="mr-3" />
									<p>Book car right now</p>
								</button>
							)}
						</div>
					</div>
				</div>
			)}

			{car?.reviews && car?.reviews[0] ? (
				<>
					<div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center ">
						<div className="flex flex-col justify-start items-start w-full space-y-8 px-4">
							<div className="flex justify-start items-start">
								<p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
									Review car 🤗🤗
								</p>
							</div>

							{car?.reviews &&
								car?.reviews.map((review) => (
									<ReviewCar
										key={review._id}
										review={review}
										setMenu={setMenu}
										menu={menu}
									/>
								))}
						</div>
					</div>
				</>
			) : (
				<div className="lg:px-20 md:px-6 px-4 py-12">
					<div className="flex flex-col items-center justify-center">
						<h1 className="lg:text-4xl text-3xl font-bold text-center text-gray-800 dark:text-white ">
							Not yet review 🤗🤗
						</h1>
						<p className="text-base leading-6 mt-4 text-center text-gray-600 dark:text-white  2xl:w-2/5 ">
							Let's rent a car to experience the same tours and reviews
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default CarDetail;
