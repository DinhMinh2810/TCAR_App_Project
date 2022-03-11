import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBarStaff from './../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from './../../Layout/TitleBarPage';
import { getAdminCar, removeAssignCar } from '../../../redux/actions/carAction';

const AssignCar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cars } = useSelector((state) => state.carsProduct);
	const { success, isRemoved } = useSelector((state) => state.assignCar);

	useEffect(() => {
		dispatch(getAdminCar());

		if (success) {
			toast.success('Assign this user to car successfully !!');
			dispatch({ type: 'ASSIGN_CAR_RESET' });
		}

		if (isRemoved) {
			toast.success('Remove assign car successfully !!');
			dispatch({ type: 'REMOVE_ASSIGN_CAR_RESET' });
		}
	}, [dispatch, success, isRemoved]);

	const assignCarHandle = (id) => {
		navigate(`/staff/assignCarToDriver/${id}`);
	};

	const removeAssignCarHandle = (id) => {
		dispatch(removeAssignCar(id));
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Assign Car" />
			<div className="flex flex-col p-3">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Assign car for driver</h2>
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
											Start - end day
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
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{car?.rentPerDay}$
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{car?.available}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{String(car?.startDay)?.substr(0, 10)} --
												{String(car?.endDay)?.substr(0, 10)}
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
														Not yet driver
													</td>
												</>
											)}
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
												<button
													className="border-1 p-2 rounded bg-cyan-300 mr-2"
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssignCar;
