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

const AllBooking = () => {
	const dispatch = useDispatch();
	const { error, books } = useSelector((state) => state.allBooking);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		// if (deleteError) {
		// 	alert.error(deleteError);
		// 	dispatch(clearErrors());
		// }

		// if (isDeleted) {
		// 	alert.success('Order Deleted Successfully');
		// 	history.push('/admin/orders');
		// 	dispatch({ type: DELETE_ORDER_RESET });
		// }

		dispatch(getAllBooking());
	}, [dispatch, error]);

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
											Name driver
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Start <span className="font-extrabold"> &#8594; </span>
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
														</div>
														<div className="text-sm text-gray-500">
															{book?.bookCars[0]?.seatsCategory} seat category
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{book?.userBooking.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{book?.bookCars[0]?.nameDriver}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{moment(book?.bookCars[0]?.startDay).format('LLL')}
												<span className="font-extrabold"> &#8594; </span>
												{moment(book?.bookCars[0]?.endDay).format('LLL')}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												location
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												$ {book?.totalPrice}
											</td>
											{book?.bookingStatus === 'Done' ? (
												<td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-500">
													{book?.bookingStatus}
												</td>
											) : book?.bookingStatus === 'Running' ? (
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
													// onClick={() => updateCarHandle(car?._id)}
												>
													Update status
												</button>
												<button
													className="border-1 p-2 rounded bg-red-500 text-white"
													// onClick={() => deleteCarHandle(car?._id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllBooking;
