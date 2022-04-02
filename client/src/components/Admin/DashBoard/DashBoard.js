import React, { useEffect } from 'react';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import './dashboard.css';
import TitleBarPage from '../../Layout/TitleBarPage';
import { useSelector, useDispatch } from 'react-redux';
import { allAccUsers } from '../../../redux/actions/adminAction';
import { getAdminCar } from '../../../redux/actions/carAction';
import { getAllBooking } from '../../../redux/actions/bookingAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import AddCardIcon from '@mui/icons-material/AddCard';
import StatisticsChart from './StatisticsChart';
import { Rating } from '@mui/material';
import Loader from '../../Layout/Loader/Loader';
import { statisticsTotalAmountBooking } from './../../../redux/actions/bookingAction';

const Dashboard = () => {
	const dispatch = useDispatch();

	const { carsCount, carsReview } = useSelector((state) => state.carsProduct);

	const { loading, booksCount, totalAllPrice, books } = useSelector(
		(state) => state.allBooking
	);
	const {
		totalMonth1,
		totalMonth2,
		totalMonth3,
		totalMonth4,
		totalMonth5,
		totalMonth6,
		totalMonth7,
		totalMonth8,
		totalMonth9,
		totalMonth10,
		totalMonth11,
		totalMonth12,
	} = useSelector((state) => state.allBookingStatic);

	const { numAccountOfUser } = useSelector((state) => state.allAccUsers);

	useEffect(() => {
		dispatch(getAdminCar());
		dispatch(allAccUsers());
		dispatch(getAllBooking());
		dispatch(statisticsTotalAmountBooking());
	}, [dispatch]);

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Dashboard Admin" />
			<>
				{loading ? (
					<Loader />
				) : (
					<div className="dashboardContainer px-10">
						<div className="text-center py-3">
							<h1 className="text-3xl font-semibold tracking-wider uppercase sm:px-5">
								Dashboard
							</h1>
						</div>

						<div className="p-4 text-white bg-blue-500 rounded-md shadow-md">
							<div className="flex items-center justify-center">
								<span className="text-white text-2xl font-medium">
									Total Amount Money: $ {totalAllPrice}
								</span>
							</div>
						</div>
						<div className="mt-4">
							<div className="flex flex-wrap -mx-6">
								<div className="w-full px-6 sm:w-1/2 xl:w-1/3">
									<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
										<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
											<AddCardIcon
												className="h-8 w-8 text-white"
												fontSize="large"
											/>
										</div>

										<div className="mx-5">
											<h4 className="text-2xl font-semibold text-gray-700">
												{booksCount}
											</h4>
											<div className="text-gray-500">All Bookings</div>
										</div>
									</div>
								</div>

								<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
									<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
										<div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
											<LocalCarWashIcon
												className="h-8 w-8 text-white"
												fontSize="large"
											/>
										</div>

										<div className="mx-5">
											<h4 className="text-2xl font-semibold text-gray-700">
												{carsCount}
											</h4>
											<div className="text-gray-500">All Cars</div>
										</div>
									</div>
								</div>

								<div className="w-full mt-6 px-6 sm:w-2/2 xl:w-1/3 xl:mt-0">
									<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white sm:justify-center">
										<div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
											<AccountCircleIcon
												className="h-8 w-12 text-white"
												fontSize="large"
											/>
										</div>

										<div className="mx-5">
											<h4 className="text-2xl font-semibold text-gray-700">
												{numAccountOfUser}
											</h4>
											<div className="text-gray-500">All Users</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<StatisticsChart
								books={books}
								totalMonth1={totalMonth1}
								totalMonth2={totalMonth2}
								totalMonth3={totalMonth3}
								totalMonth4={totalMonth4}
								totalMonth5={totalMonth5}
								totalMonth6={totalMonth6}
								totalMonth7={totalMonth7}
								totalMonth8={totalMonth8}
								totalMonth9={totalMonth9}
								totalMonth10={totalMonth10}
								totalMonth11={totalMonth11}
								totalMonth12={totalMonth12}
							/>
						</div>
						<div className="mb-4">
							<h3 className="chartTitle">Top 5 car hight ratings 🥰🥰</h3>
							<div className="flex flex-col p-3">
								<div className="-my-2 overflow-x-auto">
									<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
										<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
															Rating
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
														>
															Location
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													{carsReview?.map((review) => (
														<tr key={review?._id}>
															<td className="px-6 py-4 whitespace-nowrap">
																<div className="flex items-center">
																	<div className="flex-shrink-0 h-10 w-10">
																		<img
																			className="h-10 w-10 rounded-full"
																			src={review?.images[0].url}
																			alt=""
																		/>
																	</div>
																	<div className="ml-4">
																		<div className="text-sm font-medium text-gray-900">
																			{review?.name}
																		</div>
																		<div className="text-sm text-gray-500">
																			{review?.seatsCategory} seats category
																		</div>
																	</div>
																</div>
															</td>

															<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																<Rating
																	value={review?.ratings}
																	precision={0.5}
																	readOnly
																/>
															</td>
															<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																<p className="break-words whitespace-pre-wrap">
																	{review?.location}
																</p>
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
					</div>
				)}
			</>
		</div>
	);
};

export default Dashboard;
