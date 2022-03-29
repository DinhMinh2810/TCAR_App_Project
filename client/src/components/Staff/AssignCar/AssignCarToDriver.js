import React, { useEffect, useState } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverNotAssign } from '../../../redux/actions/staffAction';
import { assignCar } from '../../../redux/actions/carAction';
import Pagination from 'react-js-pagination';

const AssignCarToDriver = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const carId = id;
	const [currentPage, setCurrentPage] = useState(1);
	const { users, resultItemPage, usersCount, loading } = useSelector(
		(state) => state.allAccDriver
	);
	const { success, error } = useSelector((state) => state.assignCar);

	useEffect(() => {
		dispatch(getDriverNotAssign(currentPage));

		if (error) {
			toast.error(error);
			dispatch({ type: 'CLEAR_ERRORS' });
		}

		if (success) {
			navigate('/staff/assignCar');
		}
	}, [dispatch, success, navigate, error, currentPage]);

	const assignUserToCarHandle = (userId) => {
		dispatch(assignCar(carId, userId));
	};

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Assign driver to this car" />
			<div className="flex flex-col p-3">
				<div className="-my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">All driver not assign car</h2>
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Name
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
											Role
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
									{users?.map((user) => (
										<tr key={user?._id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<img
															className="h-10 w-10 rounded-full"
															src={user?.avatar?.url}
															alt=""
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{user?.name}
														</div>
														<div className="text-sm text-gray-500">
															{user?.email}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{user?.location}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user?.role}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
												<button
													onClick={() => assignUserToCarHandle(user?._id)}
													className="border-1 p-2 rounded bg-cyan-300 mr-2 text-white bg-blue-600 hover:bg-blue-800"
												>
													Assign this driver to car
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex items-center justify-center mt-4">
							{resultItemPage < usersCount && (
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={resultItemPage}
									totalItemsCount={usersCount}
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

export default AssignCarToDriver;
