import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCarAssign } from '../../redux/actions/carAction';
import moment from 'moment';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MyAssignCar = () => {
	const dispatch = useDispatch();
	const { car } = useSelector((state) => state.carsProduct);
	console.log('====================================');
	console.log(typeof car);
	console.log('====================================');

	function isRealValue(obj) {
		return obj && obj !== 'null' && obj !== 'undefined';
	}

	useEffect(() => {
		dispatch(getMyCarAssign());
	}, [dispatch]);

	return (
		<>
			{car && car[0] ? (
				car.map((item) => (
					<div
						className="flex items-center justify-center mt-20"
						key={item.name}
					>
						<div className="group relative text-neutral-700">
							<div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
								<img
									src={item.images[0].url}
									alt=""
									className="w-full h-full object-center object-cover lg:w-full lg:h-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-blackBold font-bold">
										<span aria-hidden="true" className="absolute inset-0" />
										Name car: {item.name}
									</h3>
									<p className="mt-1 text-sm text-gray-600 py-2">
										Description: {item.description}
									</p>
									<p className="mt-1 text-sm flex items-center">
										<AirlineSeatReclineNormalIcon />
										{item.seatsCategory} seats category
									</p>
									<p className="mt-1 text-sm text-gray-600 py-2">
										Free time: <span className="font-extrabold"> </span>
										{moment(car?.startDay).format('LLL')}
										<span className="font-extrabold"> &#8594; </span>
										{moment(car?.endDay).format('LLL')}
									</p>

									<p className="mt-1 text-sm text-gray-600 py-2">
										<LocationOnIcon />
										{item.location}, City
									</p>
								</div>
								<p className="text-sm font-medium text-gray-800">
									$ {item.rentPerDay} / day
								</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="lg:px-20 md:px-6 px-4 py-12">
					<div className="flex flex-col items-center justify-center">
						<h1 className="lg:text-4xl text-3xl font-bold text-center text-gray-800 dark:text-white ">
							You have not been assigned to any car 🤗🤗
						</h1>
						<p className="text-base leading-6 mt-4 text-center text-gray-600 dark:text-white  2xl:w-2/5 ">
							Wait for the car to be received and work well !!
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default MyAssignCar;
