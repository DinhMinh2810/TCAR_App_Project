import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import TitleBarPage from '../Layout/TitleBarPage';
import { changePasswordUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/authAction';

const ChangePassword = () => {
	const dispatch = useDispatch();
	const { loading, error, isUpdated } = useSelector(
		(state) => state.profileUser
	);
	const navigate = useNavigate();

	const [formData, setFormData] = useState('');
	const initialValues = {
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object({
		oldPassword: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters !!'),
		newPassword: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters !!'),
		confirmPassword: Yup.string()
			.required('Please enter password !!')
			.oneOf([Yup.ref('newPassword'), null], 'Passwords must match !!'),
	});

	const changePasswordSubmit = (values) => {
		setFormData(values);
		dispatch(changePasswordUser(formData));
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success('Profile Updated Successfully');
			navigate('/myProfile');
			dispatch({
				type: 'UPDATE_PASSWORD_RESET',
			});
		}
	}, [error, isUpdated, navigate, dispatch]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={changePasswordSubmit}
		>
			{(formik) => (
				<div className="flex items-center justify-center min-h-eightVH">
					<ToastContainer className="toastify" />
					<TitleBarPage title="User change password" />
					<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
						<h3 className="text-2xl font-bold text-center">Change password</h3>
						<form onSubmit={formik.handleSubmit}>
							<div className="mt-4">
								<div className="mt-4">
									<label className="block" htmlFor="email">
										Old Password
									</label>
									<input
										id="oldPassword"
										type="password"
										placeholder="Please enter password"
										className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
										{...formik.getFieldProps('oldPassword')}
									/>
									{formik.touched.oldPassword && formik.errors.oldPassword ? (
										<div className="form_error">
											{formik.errors.oldPassword}
										</div>
									) : null}
								</div>
								<div className="mt-4">
									<label className="block" htmlFor="email">
										Password
									</label>
									<input
										id="newPassword"
										type="password"
										placeholder="Please enter password"
										className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
										{...formik.getFieldProps('newPassword')}
									/>
									{formik.touched.newPassword && formik.errors.newPassword ? (
										<div className="form_error">
											{formik.errors.newPassword}
										</div>
									) : null}
								</div>
								<div className="mt-4">
									<label className="block" htmlFor="email">
										Confirm Password
									</label>
									<input
										id="confirmPassword"
										type="password"
										placeholder="Please enter confirm password"
										className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
										{...formik.getFieldProps('confirmPassword')}
									/>
									{formik.touched.confirmPassword &&
									formik.errors.confirmPassword ? (
										<div className="form_error">
											{formik.errors.confirmPassword}
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
	);
};

export default ChangePassword;
