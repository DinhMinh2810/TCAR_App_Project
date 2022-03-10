import React, { useEffect } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccDriver } from '../../../redux/actions/staffAction';
import { assignCar } from '../../../redux/actions/carAction';

const AssignCarToDriver = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const carId = id;

	const { users } = useSelector((state) => state.allAccDriver);
	const { success } = useSelector((state) => state.assignCar);

	useEffect(() => {
		dispatch(getAllAccDriver());

		if (success) {
			toast.success('Assign this user to car successfully !!');
			navigate('/staff/assignCar');
		}
	}, [dispatch, success, navigate]);

	const assignUserToCarHandle = (userId) => {
		dispatch(assignCar(carId, userId));
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Assign Car to driver" />
			<div className="flex flex-col p-3">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Manager all account staff</h2>
							<Link
								to="/admin/manager/accStaff/create"
								className="border-1 p-2 rounded bg-emerald-500 text-white ml-3 mb-3 inline-block"
							>
								Create a new account
							</Link>
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
											Status
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
													Active
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{user?.role}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
												<button
													onClick={() => assignUserToCarHandle(user?._id)}
													className="border-1 p-2 rounded bg-cyan-300 mr-2"
												>
													Assign this user to car
												</button>
												<button className="border-1 p-2 rounded bg-red-500 text-white">
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

export default AssignCarToDriver;
