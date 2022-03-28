import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
	clearErrors,
	userSingleDetail,
} from '../../../redux/actions/authAction';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from '../../Layout/TitleBarPage';
import { changePasswordAccDriver } from '../../../redux/actions/staffAction';

const ChangePasswordDriver = () => {
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
		password: '',
		cfPassword: '',
	};

	const validationSchema = Yup.object({
		password: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters !!'),
		cfPassword: Yup.string()
			.required('Please enter password !!')
			.oneOf([Yup.ref('password'), null], 'Passwords must match !!'),
	});

	const changePasswordSubmit = (values) => {
		const { password } = values;
		dispatch(changePasswordAccDriver(userID, password));
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
			dispatch({ type: 'UPDATE_PASSWORD_RESET' });
			navigate('/staff/manager/accDriver');
		}
	}, [dispatch, userID, error, user, isUpdated, navigate, updateError]);

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Staff Change password driver" />
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={changePasswordSubmit}
			>
				{(formik) => (
					<div className="flex items-center justify-center min-h-eightVH">
						<ToastContainer className="toastify" />
						<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
							<h3 className="text-2xl font-bold text-center">
								Change password driver
							</h3>
							<form onSubmit={formik.handleSubmit}>
								<div className="mt-4">
									<div>
										<label className="block" htmlFor="email">
											Password
										</label>
										<input
											id="password"
											type="password"
											placeholder="Please enter password"
											className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
											{...formik.getFieldProps('password')}
										/>
										{formik.touched.password && formik.errors.password ? (
											<div className="form_error">{formik.errors.password}</div>
										) : null}
									</div>
									<div className="mt-4">
										<label className="block" htmlFor="email">
											Confirm Password
										</label>
										<input
											id="cfPassword"
											type="password"
											placeholder="Please enter confirm password"
											className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
											{...formik.getFieldProps('cfPassword')}
										/>
										{formik.touched.cfPassword && formik.errors.cfPassword ? (
											<div className="form_error">
												{formik.errors.cfPassword}
											</div>
										) : null}
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

export default ChangePasswordDriver;
