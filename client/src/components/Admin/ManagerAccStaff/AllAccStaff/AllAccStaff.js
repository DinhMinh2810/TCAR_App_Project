import React, { useEffect, useState } from 'react';
import TitleBarPage from '../../../Layout/TitleBarPage';
import HeaderBarAdmin from '../../HeaderBarAdmin/HeaderBarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAccUser,
	getAllAccStaff,
} from '../../../../redux/actions/adminAction';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../Layout/Loader/Loader';
import { clearErrors } from '../../../../redux/actions/authAction';
import Pagination from 'react-js-pagination';

const AllAccStaff = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);

	const { users, resultItemPage, usersCount, loading } = useSelector(
		(state) => state.allAccStaff
	);
	const { isCreated } = useSelector((state) => state.CRUDAccStaff);
	const {
		error: deleteAccUserError,
		isDeleted,
		message,
	} = useSelector((state) => state.deleteAccUsers);

	const { isUpdated } = useSelector((state) => state.profileUser);

	useEffect(() => {
		dispatch(getAllAccStaff(currentPage));

		if (deleteAccUserError) {
			toast.warn(deleteAccUserError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success(message);
			navigate('/admin/manager/accStaff');
			dispatch({ type: 'DELETE_USER_RESET' });
		}

		if (isCreated) {
			toast.success('Admin create account for Staff success !!."');
		}

		if (isUpdated) {
			toast.success(isUpdated);
		}
	}, [
		dispatch,
		isDeleted,
		deleteAccUserError,
		navigate,
		message,
		isUpdated,
		isCreated,
		currentPage,
	]);

	const changePasswordHandle = (userID) => {
		navigate(`/admin/manager/accStaff/changePassword/${userID}`);
	};

	const deleteAccUserHandle = (userID) => {
		dispatch(deleteAccUser(userID));
	};

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Manager all staff" />
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
														onClick={() => changePasswordHandle(user?._id)}
														className="border-1 p-2 rounded bg-cyan-300 mr-2 text-white bg-blue-600 hover:bg-blue-800"
													>
														Change Password
													</button>
													<button
														onClick={() => deleteAccUserHandle(user?._id)}
														className="border-1 p-2 rounded bg-red-500 text-white"
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

export default AllAccStaff;
