import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeaderBarStaff from './../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from './../../Layout/TitleBarPage';
import { getAdminCar, removeAssignCar } from '../../../redux/actions/carAction';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import Loader from '../../Layout/Loader/Loader';

const AssignCar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const { success, isRemoved } = useSelector((state) => state.assignCar);
	const { loading, cars, carsCount, resultItemPage } = useSelector(
		(state) => state.carsProduct
	);

	useEffect(() => {
		dispatch(getAdminCar(currentPage));

		if (success) {
			toast.success('Assign this user to car successfully !!');
			dispatch({ type: 'ASSIGN_CAR_RESET' });
		}

		if (isRemoved) {
			toast.success('Remove assign car successfully !!');
			dispatch({ type: 'REMOVE_ASSIGN_CAR_RESET' });
		}
	}, [dispatch, success, isRemoved, currentPage]);

	const assignCarHandle = (id) => {
		navigate(`/staff/assignCarToDriver/${id}`);
	};

	const removeAssignCarHandle = (id) => {
		dispatch(removeAssignCar(id));
	};

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Assign Car" />
			<div className="flex flex-col p-3">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Assign car for driver</h2>
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
												Available
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Start <span className="font-extrabold"> &#8594; </span>
												end day free
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
												Driver assign
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Action
											</th>
											<th scope="col" className="relative px-6 py-3">
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{cars?.map((car) => (
											<tr key={car?._id}>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															<img
																className="h-10 w-10 rounded-full"
																src={car?.images[1]?.url}
																alt=""
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{car?.name}
															</div>
															<div className="text-sm text-gray-500">
																{car?.seatsCategory} seat category
															</div>
														</div>
													</div>
												</td>
												{car.available === 'notYetBook' ? (
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														Ready
													</td>
												) : (
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														Booked
													</td>
												)}
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{moment(car?.startDay).format('LLL')}
													<span className="font-extrabold"> &#8594; </span>
													{moment(car?.endDay).format('LLL')}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{car?.location}
												</td>
												{car?.assigns?.name ? (
													<>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{car?.assigns?.name}
														</td>
													</>
												) : (
													<>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															Not yet
														</td>
													</>
												)}

												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
													<button
														className="border-1 p-2 rounded bg-cyan-300 mr-2 text-white bg-blue-600 hover:bg-blue-800"
														onClick={() => assignCarHandle(car?._id)}
													>
														Assign
													</button>
													<button
														className="border-1 p-2 rounded bg-red-500 text-white"
														onClick={() => removeAssignCarHandle(car?._id)}
													>
														Remove
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
						<div className="flex items-center justify-center mt-3">
							{resultItemPage < carsCount && (
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={resultItemPage}
									totalItemsCount={carsCount}
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

export default AssignCar;
