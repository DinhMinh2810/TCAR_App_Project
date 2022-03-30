import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveCarTo } from '../../redux/actions/favoriteCartActions';
import { useNavigate } from 'react-router-dom';
import TitleBarPage from '../Layout/TitleBarPage';
import moment from 'moment';
import { toast } from 'react-toastify';

const ReceiveCarTo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { receivingCarTo, bookingCar } = useSelector(
		(state) => state.favoriteCart
	);

	const [citizenIdentifications, setCitizenIdentifications] = useState(
		receivingCarTo.citizenIdentifications
	);
	const [phoneNum, setPhoneNum] = useState(receivingCarTo.phoneNum);
	const [day, setDay] = useState(receivingCarTo.day);

	const [address, setAddress] = useState(receivingCarTo.address);
	const [location, setLocation] = useState(bookingCar.location);

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
				`Only booked from date  ${startDayFormal} to ${endDayFormal} !!`
			);
		}
		if (VALUETO >= ENDDAY) {
			toast.error(
				`Only booked from date  ${startDayFormal} to ${endDayFormal} !!`
			);
		} else {
			setDay(valueTo);
		}
	};

	const confirmReceiveSubmit = (e) => {
		e.preventDefault();
		dispatch(
			receiveCarTo({ citizenIdentifications, phoneNum, day, address, location })
		);

		navigate('/confirmBookCar');
		setCitizenIdentifications('');
		setPhoneNum('');
		setDay('');
		setAddress('');
		setLocation('');
	};

	return (
		<div className="flex items-center justify-center min-h-eightVH mt-10">
			<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
				<h3 className="text-2xl font-bold text-center">
					Confirm information receive car
				</h3>
				<TitleBarPage title="Receive car to" />
				<form encType="multipart/form-data" onSubmit={confirmReceiveSubmit}>
					<div className="mt-4">
						<div>
							<label className="block" htmlFor="text">
								Citizen Identification
							</label>
							<input
								type="number"
								placeholder="Please enter your citizen identification"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								required
								value={citizenIdentifications}
								onChange={(e) => setCitizenIdentifications(e.target.value)}
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								Phone number
							</label>
							<input
								type="number"
								placeholder="Please enter your phone number"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								required
								value={phoneNum}
								onChange={(e) => setPhoneNum(e.target.value)}
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								Time receive car
							</label>

							<input
								type="datetime-local"
								value={day}
								min={disablePastDate()}
								onChange={(e) =>
									checkDates(
										e.target.value,
										bookingCar.startDay,
										bookingCar.endDay
									)
								}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								Address
							</label>
							<input
								type="text"
								placeholder="Please enter your address"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								Location
							</label>
							<input
								type="text"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								required
								placeholder={bookingCar.location}
								value={bookingCar.location}
							/>
						</div>

						<div className="flex">
							<button
								type="submit"
								className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReceiveCarTo;
