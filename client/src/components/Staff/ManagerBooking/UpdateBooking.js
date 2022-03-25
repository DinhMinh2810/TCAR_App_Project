import React, { useState, useEffect } from 'react';
import HeaderBarAdmin from './../../Admin/HeaderBarAdmin/HeaderBarAdmin';
import TitleBarPage from './../../Layout/TitleBarPage';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	getBookingDetails,
	updateStatusBooking,
} from './../../../redux/actions/bookingAction';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const UpdateBooking = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { book, error, loading } = useSelector((state) => state.bookingDetails);

	const { error: updateStatusError, isUpdated } = useSelector(
		(state) => state.updateOrDeleteBooking
	);

	const [status, setStatus] = useState('');

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (updateStatusError) {
			toast.error(updateStatusError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success('Booking status updated successfully !!');
			dispatch({ type: 'UPDATE_STATUS_BOOKING_RESET' });
		}

		dispatch(getBookingDetails(id));
	}, [dispatch, error, id, isUpdated, updateStatusError, navigate]);

	const updateStatusSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.set('status', status);

		dispatch(updateStatusBooking(id, formData));
		navigate('/manager/allBooking');
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Update status booking car" />
			<>
				<div id="blog" className="px-4 xl:px-0 pt-4">
					<div className="mx-auto container">
						<h2 className="text-center pb-3">Update status booking car</h2>

						<ToastContainer className="toastify text-xs" />
						<div className="mt-4">
							<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
								<div className="mx-0 my-auto">
									<div className="flex items-center justify-center">
										<div className="w-full max-w-md">
											<form
												className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
												onSubmit={updateStatusSubmit}
											>
												<div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
													Update status
												</div>
												<div className="mb-4">
													<label className="block text-gray-700 text-sm font-normal mb-2">
														Status
													</label>
													<select
														name="method"
														id="method"
														required
														onChange={(e) => setStatus(e.target.value)}
														className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
													>
														<option value="">Please choose methods</option>
														<option value="Processing">Processing</option>
														<option value="isRunning">Is running</option>
														<option value="Done">Done</option>
													</select>
												</div>
												<div className="flex items-center justify-center">
													<button
														className="px-8 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
														type="submit"
													>
														Submit
													</button>
												</div>
											</form>

											<p className="text-center text-gray-500 text-xs">
												&copy;TCAR.
											</p>
										</div>
									</div>
								</div>
								<div>
									<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
										<div>
											<div className="bg-white shadow-lg px-3 lg:px-6 py-4 rounded-3xl">
												<h1 className="text-lg text-gray-900 font-semibold tracking-wider text-center">
													User Booking
												</h1>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Name: {book?.userBooking && book?.userBooking.name}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Email: {book?.userBooking && book?.userBooking.email}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8 tracking-wide mt-2">
													Phone:
													{book?.receivingCarTo &&
														book?.receivingCarTo.phoneNum}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Identifications:
													{book?.receivingCarTo &&
														book?.receivingCarTo.citizenIdentifications}
												</p>
											</div>
										</div>
										<div>
											<div className="bg-white shadow-lg px-3 lg:px-6 py-4 rounded-3xl">
												<h1 className="text-lg text-gray-900 font-semibold tracking-wider text-center">
													Information received
												</h1>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Day received car:
													{book?.receivingCarTo && book?.receivingCarTo.day}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Location:
													{book?.receivingCarTo && book?.receivingCarTo.address}
													<span> </span>
													{book?.receivingCarTo &&
														book?.receivingCarTo.location}
													<span> </span>
													city
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Booking status:
													{book?.bookingStatus && book?.bookingStatus}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Booking done:
													{book?.deliveredAt && book?.deliveredAt}
												</p>
											</div>
										</div>
										<div>
											<div className="bg-white shadow-lg px-3 lg:px-6 py-4 rounded-3xl">
												<h1 className="text-lg text-gray-900 font-semibold tracking-wider text-center">
													Price
												</h1>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Rent per day: $ {book?.itemsPrice && book?.itemsPrice}
													/ day
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													ShuttleFee: ${book?.shuttleFee && book?.shuttleFee}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8 tracking-wide mt-2">
													Pay for driver: $
													{book?.priceForDriver && book?.priceForDriver}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Deposits: $ {book?.deposits && book?.deposits}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Total : $ {book?.totalPrice && book?.totalPrice}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Payment Status :
													{book?.paymentInfo && book?.paymentInfo.status}
													{book?.paidAt && book?.paidAt}
												</p>
											</div>
										</div>

										<div>
											<div className="bg-white shadow-lg px-3 lg:px-6 py-4 rounded-3xl">
												<h1 className="text-lg text-gray-900 font-semibold tracking-wider text-center">
													Car Information
												</h1>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Name: {book?.bookCars && book?.bookCars[0].name}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													Name Driver:{' '}
													{book?.bookCars && book?.bookCars[0].nameDriver}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8 tracking-wide mt-2">
													Seats Category:
													{book?.bookCars && book?.bookCars[0].seatsCategory}
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8 tracking-wide mt-2">
													Num day rental:
													{book?.bookCars && book?.bookCars[0].quantity} days
												</p>
												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													startDay :
													{book?.bookCars && book?.bookCars[0].startDay}{' '}
													{book?.bookCars && book?.bookCars[0].endDay}
												</p>

												<p className="text-gray-700 text-xs lg:text-base lg:leading-8  tracking-wide mt-2">
													location :
													{book?.bookCars && book?.bookCars[0].location}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};

export default UpdateBooking;
