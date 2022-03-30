import React, { useEffect, useState } from 'react';
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
import Pagination from 'react-js-pagination';

const AllBooking = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();
	const { error, loading, totalAllPrice, booksCount, resultItemPage, books } =
		useSelector((state) => state.allBooking);
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

		dispatch(getAllBooking(currentPage));
	}, [dispatch, error, isDeleted, deleteError, currentPage]);

	const deleteBookingHandle = (id) => {
		dispatch(deleteBooking(id));
	};

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Manager all booking" />
			<div className="flex flex-col px-3 pb-3 pt-4">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">
								Manager all booking - $ {totalAllPrice} / total
							</h2>
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
													Car
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Start
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
																</div>
																<div className="text-sm text-gray-500">
																	{book?.bookCars[0]?.seatsCategory} seat
																	category
																</div>
															</div>
														</div>
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
													{book?.bookingStatus === 'Processing' ? (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
															Processing
														</td>
													) : book?.bookingStatus === 'isRunning' ? (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">
															Is running
														</td>
													) : (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-lime-600">
															Done
														</td>
													)}

													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
														<button
															className="border-1 p-2 rounded bg-cyan-300 mr-2 text-white bg-blue-600 hover:bg-blue-800"
															onClick={() =>
																navigate(
																	`/manager/ViewDetailBooking/${book?._id}`
																)
															}
														>
															View
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
						<div className="flex items-center justify-center mt-3">
							{resultItemPage < booksCount && (
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={resultItemPage}
									totalItemsCount={booksCount}
									onChange={setCurrentPageNo}
									nextPageText="Next"
									prevPageText="Prev"
									firstPageText="1st"
									lastPageText="Last"
									itemClass="page-item"
									linkClass="page-link"
									activeClass="pageItemActive"
									activeLinkClass="pageLinkActive"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllBooking;
