import React, { useEffect } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
	clearErrors,
	userSingleDetail,
} from '../../../redux/actions/authAction';
import { updateRoleUser } from '../../../redux/actions/adminAction';

const EditRole = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, user } = useSelector(
		(state) => state.userSingleDetail
	);

	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profileUser);

	const { id } = useParams();
	const userID = id;

	const initialValues = {
		role: '',
	};

	const validationSchema = Yup.object({
		role: Yup.string().required('Please choose role!!'),
	});

	const updateRoleSubmit = (values) => {
		const { role } = values;
		dispatch(updateRoleUser(userID, role));
	};

	useEffect(() => {
		if (user && user._id !== userID) {
			dispatch(userSingleDetail(userID));
		}

		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success(isUpdated);
			navigate('/admin/manager/allAccount');
			dispatch({ type: 'UPDATE_USER_RESET' });
		}
	}, [dispatch, userID, error, user, isUpdated, navigate, updateError]);

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Admin update role user" />
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={updateRoleSubmit}
			>
				{(formik) => (
					<div className="flex items-center justify-center min-h-eightVH">
						<ToastContainer className="toastify" />
						<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
							<h3 className="text-2xl font-bold text-center">
								Update role user
							</h3>
							<form onSubmit={formik.handleSubmit}>
								<div className="mt-4">
									<div className="mt-4">
										<label className="block">Role</label>
										<select
											name="role"
											id="role"
											className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
											{...formik.getFieldProps('role')}
										>
											<option value="">Please choose roles</option>
											<option value="Admin">Admin</option>
											<option value="Staff">Staff</option>
											<option value="Driver">Driver</option>
											<option value="User">User</option>
										</select>
									</div>
									<div className="flex">
										<button
											type="submit"
											className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
};

export default EditRole;
