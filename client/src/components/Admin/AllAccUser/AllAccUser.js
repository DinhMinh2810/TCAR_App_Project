import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	allAccUsers,
	clearErrors,
	deleteAccUser,
} from '../../../redux/actions/adminAction';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllAccUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, users } = useSelector((state) => state.allAccUsers);

	const {
		error: deleteAccUserError,
		isDeleted,
		message,
	} = useSelector((state) => state.deleteAccUsers);

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (deleteAccUserError) {
			toast.warn(deleteAccUserError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success(message);
			navigate('/admin/manager/allAccount');
			dispatch({ type: 'DELETE_USER_RESET' });
		}
		dispatch(allAccUsers());
	}, [dispatch, isDeleted, navigate, error, message, deleteAccUserError]);

	const deleteAccUserHandle = (userID) => {
		dispatch(deleteAccUser(userID));
	};

	const updateRoleUserHandle = (userID) => {
		navigate(`/admin/manager/allAccount/editRole/${userID}`);
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Manager all account" />
			<div className="flex flex-col">
				<ToastContainer className="toastify text-xs" />
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Manager all account users</h2>
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
									{users.map((user) => (
										<tr key={user.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<img
															className="h-10 w-10 rounded-full"
															src={user.avatar.url}
															alt=""
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{user.name}
														</div>
														<div className="text-sm text-gray-500">
															{user.email}
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
												{user.role}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<button onClick={() => updateRoleUserHandle(user?._id)}>
													Edit role
												</button>
												<button onClick={() => deleteAccUserHandle(user?._id)}>
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

export default AllAccUser;
