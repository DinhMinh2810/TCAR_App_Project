import React, { useEffect } from 'react';
import HeaderBarStaff from './../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from './../../Layout/TitleBarPage';
import { ToastContainer, toast } from 'react-toastify';
import {
	clearErrors,
	getAllBooking,
} from '../../../redux/actions/bookingAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { deleteBooking } from '../../../redux/actions/bookingAction';
import Loader from '../../Layout/Loader/Loader';

const AllBooking = () => {
	const dispatch = useDispatch();
	const { error, books, loading } = useSelector((state) => state.allBooking);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.updateOrDeleteBooking
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success('This booking deleted successfully !!');
			dispatch({ type: 'DELETE_BOOKING_RESET' });
		}

		dispatch(getAllBooking());
	}, [dispatch, error, isDeleted, deleteError]);

	const deleteBookingHandle = (id) => {
		dispatch(deleteBooking(id));
	};
	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Manager all booking" />
			<div className="flex flex-col p-3">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Manager all booking</h2>
							<>
								{loading ? (
									<Loader />
								) : (
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Name car
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Name user
												</th>

												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Start{' '}
													<span className="font-extrabold"> &#8594; </span>
													end day rental
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Location
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Total
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Status
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Action
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{books?.map((book) => (
												<tr key={book?._id}>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img
																	className="h-10 w-10 rounded-full"
																	src={book?.bookCars[0]?.image}
																	alt=""
																/>
															</div>
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{book?.bookCars[0]?.name}
																	<span> </span>
																	Driver: {book?.bookCars[0]?.nameDriver}
																</div>
																<div className="text-sm text-gray-500">
																	{book?.bookCars[0]?.seatsCategory} seat
																	category
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{book?.userBooking.name}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{moment(book?.bookCars[0]?.startDay).format('LLL')}
														<span className="font-extrabold"> &#8594; </span>
														{moment(book?.bookCars[0]?.endDay).format('LLL')}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{book?.bookCars[0]?.location}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														$ {book?.totalPrice}
													</td>
													{book?.bookingStatus === 'Done' ? (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-500">
															{book?.bookingStatus}
														</td>
													) : book?.bookingStatus === 'isRunning' ? (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-sky-500">
															{book?.bookingStatus}
														</td>
													) : (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{book?.bookingStatus}
														</td>
													)}

													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
														<button
															className="border-1 p-2 rounded bg-cyan-300 mr-2"
															onClick={() =>
																navigate(
																	`/manager/updateStatusBooking/${book?._id}`
																)
															}
														>
															View or update status
														</button>
														<button
															className="border-1 p-2 rounded bg-red-500 text-white"
															onClick={() => deleteBookingHandle(book?._id)}
														>
															Delete
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllBooking;
