import React, { useEffect } from 'react';
import { clearErrors, myBooking } from '../../redux/actions/bookingAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import Loader from '../Layout/Loader/Loader';
import TitleBarPage from './../Layout/TitleBarPage';
import { useNavigate } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';

const MyBooking = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, books } = useSelector((state) => state.myBooking);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(myBooking());
	}, [dispatch, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-col p-3">
					<ToastContainer className="toastify text-xs" />
					<TitleBarPage title="My booking car" />
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<h2 className="text-center pb-3">My booking car 🚖🚘</h2>

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
												Day receive car
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Start <span className="font-extrabold"> &#8594; </span>{' '}
												end day
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Deposits
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Payment for driver
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Total price
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
																{book?.bookCars[0]?.quantity} day rental
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{moment(book?.receivingCarTo?.day).format('LLL')},
													<span className="font-extrabold"> </span>
													{book?.receivingCarTo?.address},
													<span className="font-extrabold"> </span>
													{book?.receivingCarTo?.location}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{moment(book?.bookCars[0]?.startDay).format('LLL')}
													<span className="font-extrabold"> &#8594; </span>
													{moment(book?.bookCars[0]?.endDay).format('LLL')}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													$ {book?.deposits}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													$ {book?.priceForDriver}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													$ {book?.totalPrice}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{book?.bookingStatus}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
													<button
														className="border-1 p-2 rounded bg-cyan-300 mr-2"
														onClick={() => navigate('/')}
													>
														👀
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
			)}
		</>
	);
};

export default MyBooking;
