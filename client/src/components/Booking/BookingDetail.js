import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/bookingAction';
import { getBookingDetails } from './../../redux/actions/bookingAction';
import { toast } from 'react-toastify';
import Loader from '../Layout/Loader/Loader';
import moment from 'moment';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import PaidIcon from '@mui/icons-material/Paid';
import { Dialog } from '@mui/material';
import { Rating } from '@mui/material';
import { createReview } from './../../redux/actions/carAction';

const BookingDetail = () => {
	const { book, error, loading } = useSelector((state) => state.bookingDetails);
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [quality, setQuality] = useState('');
	const qualitys = ['Unsatisfied', 'Normal', 'Satisfied'];

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(getBookingDetails(id));
	}, [dispatch, error, id]);

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	const reviewSubmitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('carId', book?.bookCars[0]?.car);
		formData.set('driver', quality);
		formData.set('comment', comment);
		formData.set('rating', rating);

		dispatch(createReview(formData));
		console.log(Object.fromEntries(formData));
		setOpen(false);
		navigate('/');
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="p-10">
					<div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
						<div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
							<h1 className="ml-2 uppercase font-bold text-gray-500">
								Booking car details
							</h1>
							<p className="ml-2 font-normal text-gray-500">
								We beside you 😂😂
							</p>
						</div>
						<div className="mt-2 flex justify-start bg-white p-2">
							<div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
								<p className="font-normal text-sm ml-1 text-gray-500">
									Check information your booking !!
								</p>
							</div>
						</div>
						<div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
							{book?.bookCars &&
								book?.bookCars.map((item) => (
									<>
										<div
											key={item?._id}
											className="flex flex-row place-item?s-center p-2"
										>
											<img
												src={item?.image}
												className="w-10 h-10"
												alt="Product"
											/>
											<div className="flex flex-col ml-2">
												<p className="text-gray-500">Name car: {item?.name}</p>
												<p className=" text-gray-500">
													Name driver: {item?.nameDriver}
												</p>
												<p className="text-gray-500">
													Seat category: {item?.seatsCategory}
												</p>
											</div>
										</div>
										<div className="flex flex-col p-2">
											<p className="text-gray-500">
												Number date rental: {item?.quantity} days
											</p>
											<p className="text-gray-500">
												Start day: {moment(item?.startDay).format('LLL')}
											</p>
											<p className="text-gray-500">
												End day: {moment(item?.endDay).format('LLL')}
											</p>
										</div>
									</>
								))}

							<div className="flex flex-col flex-wrap p-2">
								{book?.bookingStatus === 'Processing' ? (
									<p>
										Booking status:
										<span className="text-red-500"> Processing</span>
									</p>
								) : book?.bookingStatus === 'isRunning' ? (
									<p>
										Booking status:
										<span className="text-cyan-600"> Is running</span>
									</p>
								) : (
									<p>
										Booking status:
										<span className="text-lime-600"> Done</span>
									</p>
								)}
								<p className="text-gray-500 ">
									Payment status:
									{book.paymentInfo && (
										<span className="text-lime-600">
											<span> </span>
											{book.paymentInfo.status === 'succeeded' && 'Succeeded'}
										</span>
									)}
								</p>
								<p className="text-gray-500">
									Paid at: {book && moment(book.paidAt).format('LLL')}
								</p>
							</div>
						</div>
						<div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
							<div className="flex mx-6 py-4 flex-row flex-wrap">
								<CarRepairIcon className="w-22 h-22 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" />
								<div className="text-sm mx-2 flex flex-col">
									<p className="text-xl">INFO RECEIVED CAR 🙎🏼‍♂️🙎🏼‍♂️</p>
									<p className="">
										Name:
										<span> </span>
										{book?.userBooking?.nameUser && book?.userBooking?.nameUser}
									</p>
									<p className="">
										Citizen Identifications:
										<span> </span>
										{book?.receivingCarTo?.citizenIdentifications &&
											book?.receivingCarTo?.citizenIdentifications}
									</p>
									<p className="">
										Phone Number:
										<span> </span>
										{book?.receivingCarTo?.phoneNum &&
											book?.receivingCarTo?.phoneNum}
									</p>
									<p className="">
										Day receive car:
										<span> </span>
										{book?.receivingCarTo?.day &&
											moment(book?.receivingCarTo?.day).format('LLL')}
									</p>
									<p className="">
										Address:
										<span> </span>
										{book?.receivingCarTo?.address &&
											book?.receivingCarTo?.address}
										<span>, </span>
										{book?.receivingCarTo?.location &&
											book?.receivingCarTo?.location}
										city
									</p>
								</div>
							</div>

							<div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
								<PaidIcon className="w-22 h-22 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" />
								<div className="text-sm mx-2 flex flex-col">
									<p className="font-bold">Price</p>
									<p>Rent per day: $ {book.itemsPrice}</p>
									<p>ShuttleFee: $ {book.shuttleFee}</p>
									<p>Deposits: $ {book.deposits}</p>
									<p>Pay for driver: $ {book.priceForDriver}</p>
									<p>Total: $ {book.totalPrice}</p>
								</div>
								{book.bookingStatus === 'Done' && (
									<div className="flex items-center">
										<button
											className="w-32 h-11 rounded-xl flex border-solid border bg-blue-500 mx-2 justify-center place-items-center"
											onClick={submitReviewToggle}
										>
											<p className="text-white">Review car</p>
										</button>
									</div>
								)}
								{/* review */}
								<Dialog
									aria-labelledby="simple-dialog-title"
									open={open}
									onClose={submitReviewToggle}
								>
									<div className="flex items-center justify-center py-10 px-20">
										<form
											className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
											onSubmit={reviewSubmitHandler}
										>
											<div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
												Review car
											</div>
											<div className="mb-4">
												<label
													className="block text-gray-700 text-sm font-normal mb-2"
													htmlFor="username"
												>
													Driver
												</label>
												<select
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
													onChange={(e) => setQuality(e.target.value)}
												>
													<option value="">Choose quality</option>
													{qualitys.map((local) => (
														<option key={local} value={local}>
															{local}
														</option>
													))}
												</select>
											</div>
											<div className="mb-2">
												<label
													className="block text-gray-700 text-sm font-normal mb-2"
													htmlFor="password"
												>
													Comment
												</label>
												<textarea
													value={comment}
													onChange={(e) => setComment(e.target.value)}
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												/>
											</div>
											<div className="mb-2">
												<label
													className="block text-gray-700 text-sm font-normal mb-2"
													htmlFor="password"
												>
													Ratings
												</label>
												<Rating
													onChange={(e) => setRating(e.target.value)}
													value={rating.toString()}
													size="large"
												/>
											</div>

											<div className="flex items-center justify-evenly">
												<button
													className="px-3 py-2 rounded text-white inline-block shadow-lg bg-red-500 hover:bg-red-600 focus:bg-blue-700"
													type="submit"
													onClick={submitReviewToggle}
												>
													Cancel
												</button>
												<button
													className="px-3 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
													type="submit"
												>
													Submit
												</button>
											</div>
										</form>
									</div>
								</Dialog>
								{/* test */}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookingDetail;
