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
import {
	statisticsTotalAmountBooking,
	statisticsAmountLocationBooking,
} from './../../../redux/actions/bookingAction';
import StaticLocationChart from './StaticLocationChart';

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
	const {
		totalDaNang,
		totalHaNoi,
		totalHoChiMinh,
		totalCanTho,
		totalCaMau,
		totalHaiPhong,
		totalGiaLai,
		totalQuangNam,
	} = useSelector((state) => state.allBookingStaticTotalLocation);

	const { numAccountOfUser } = useSelector((state) => state.allAccUsers);

	useEffect(() => {
		dispatch(getAdminCar());
		dispatch(allAccUsers());
		dispatch(getAllBooking());
		dispatch(statisticsTotalAmountBooking());
		dispatch(statisticsAmountLocationBooking());
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
											<div className="text-gray-500">Bookings</div>
										</div>
										<div className="flex items-center justify-end flex-1 text-green-700 text-base font-bold">
											20%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												></path>
											</svg>
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
										<div className="flex items-center justify-end flex-1 text-green-700 text-base font-bold">
											50%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												></path>
											</svg>
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
										<div className="flex items-center justify-end flex-1 text-green-700 text-base font-bold">
											60%
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												></path>
											</svg>
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
						<div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mb-4">
							<div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
								<div className="flex items-center justify-between mb-4">
									<div className="flex-shrink-0">
										<span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
											Location amount chart 🤩🤩
										</span>
										<h3 className="text-base font-normal text-gray-500">
											Statistics of the total amount earned from each city
										</h3>
									</div>
									<div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
										12.5%
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</div>
								<div id="main-chart">
									<StaticLocationChart
										totalDaNang={totalDaNang}
										totalHaNoi={totalHaNoi}
										totalHoChiMinh={totalHoChiMinh}
										totalCanTho={totalCanTho}
										totalCaMau={totalCaMau}
										totalHaiPhong={totalHaiPhong}
										totalGiaLai={totalGiaLai}
										totalQuangNam={totalQuangNam}
									/>
								</div>
							</div>
							<div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
								<div className="mb-4 flex items-center justify-between">
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">
											Top 3 car hight ratings 🥰🥰
										</h3>
										<span className="text-base font-normal text-gray-500">
											This is a list of latest ratings
										</span>
									</div>
									<div className="flex-shrink-0">
										<a
											href="#/"
											className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
										>
											View all
										</a>
									</div>
								</div>
								<div className="flex flex-col mt-8">
									<div className="overflow-x-auto rounded-lg">
										<div className="align-middle inline-block min-w-full">
											<div className="shadow overflow-hidden sm:rounded-lg">
												<table className="min-w-full divide-y divide-gray-200">
													<thead className="bg-gray-50">
														<tr>
															<th
																scope="col"
																className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																Car
															</th>
															<th
																scope="col"
																className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																Rating
															</th>
															<th
																scope="col"
																className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																Location
															</th>
														</tr>
													</thead>
													<tbody className="bg-white">
														{carsReview?.map((review) => (
															<tr key={review?._id}>
																<td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
																	{review?.name}
																</td>
																<td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
																	<Rating
																		value={review?.ratings}
																		precision={0.5}
																		readOnly
																	/>
																</td>
																<td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
																	{review?.location}
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
					</div>
				)}
			</>
		</div>
	);
};

export default Dashboard;
