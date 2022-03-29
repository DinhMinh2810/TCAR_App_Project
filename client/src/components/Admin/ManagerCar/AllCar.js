import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import TitleBarPage from '../../Layout/TitleBarPage';
import {
	clearErrors,
	deleteCar,
	getAdminCar,
} from '../../../redux/actions/carAction';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import Loader from '../../Layout/Loader/Loader';

const AllCar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const { loading, cars, carsCount, resultItemPage } = useSelector(
		(state) => state.carsProduct
	);
	const { success: successCreateCar } = useSelector((state) => state.newCar);
	const {
		isDeleted,
		isUpdated,
		error: deleteError,
	} = useSelector((state) => state.updateOrDeleteCar);

	useEffect(() => {
		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success(isDeleted);
			navigate('/admin/manager/allCar');
			dispatch({ type: 'DELETE_CAR_RESET' });
		}

		if (isUpdated) {
			toast.success('Update car successfully !!');
			dispatch({ type: 'UPDATE_CAR_RESET' });
		}

		if (successCreateCar) {
			toast.success('Create car successfully !!');
			dispatch({ type: 'NEW_CAR_RESET' });
		}

		dispatch(getAdminCar(currentPage));
	}, [
		dispatch,
		isDeleted,
		navigate,
		deleteError,
		isUpdated,
		successCreateCar,
		currentPage,
	]);

	const updateCarHandle = (id) => {
		navigate(`/admin/manager/allCar/update/${id}`);
	};

	const deleteCarHandle = (id) => {
		dispatch(deleteCar(id));
	};

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Manager all car" />
			<div className="flex flex-col p-3">
				<div className="-my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Manager all car</h2>
							<Link
								to="/admin/manager/allCar/create"
								className="border-1 p-2 rounded bg-emerald-500 text-white ml-3 mb-3 inline-block"
							>
								Create a new car
							</Link>
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
												Rent per day
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
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													$ {car?.rentPerDay}
												</td>
												{car.available === 'notYetBook' ? (
													<td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">
														Not yet book
													</td>
												) : car.available === 'Update' ? (
													<td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
														Need update date
													</td>
												) : (
													<td className="px-6 py-4 whitespace-nowrap text-sm text-lime-600">
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
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
													<button
														className="border-1 p-2 rounded bg-cyan-300 mr-2 text-white bg-blue-600 hover:bg-blue-800"
														onClick={() => updateCarHandle(car?._id)}
													>
														Update
													</button>
													<button
														className="border-1 p-2 rounded bg-red-500 text-white"
														onClick={() => deleteCarHandle(car?._id)}
													>
														Delete
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

export default AllCar;
