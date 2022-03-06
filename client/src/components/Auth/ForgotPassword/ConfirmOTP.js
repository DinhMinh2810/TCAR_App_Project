import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, confirmOTP } from '../../../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import TitleBarPage from './../../Layout/TitleBarPage';
import { useEffect } from 'react';
import Loader from '../../Layout/Loader/Loader';
import { Link } from 'react-router-dom';

const ConfirmOTP = () => {
	const dispatch = useDispatch();

	const { error, message, loading, data } = useSelector(
		(state) => state.forgotPassword
	);

	const initialValues = {
		email: message?.email,
		otp: '',
	};

	const validationSchema = Yup.object({
		otp: Yup.string().required('Please enter phone !!'),
	});

	const confirmOtpSubmit = (values) => {
		const { email, otp } = values;
		dispatch(confirmOTP(email, otp));
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		if (data) {
			toast.success(data.message);
		}
	}, [dispatch, error, data]);

	return (
		<>
			<TitleBarPage title="Forgot Password" />
			<ToastContainer className="toastify" />
			{loading ? (
				<Loader />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={confirmOtpSubmit}
				>
					{(formik) => (
						<div className="flex items-center justify-center min-h-eightVH">
							<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
								{data ? (
									<>
										<h3 className="text-2xl font-bold text-center">
											Click button to reset your password !!
										</h3>
										<div className="flex">
											<Link
												className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 text-center"
												to={`/resetPassword/${data.resetPWToken}`}
											>
												Click here
											</Link>
										</div>
									</>
								) : (
									<>
										<h3 className="text-2xl font-bold text-center">
											Confirm OTP
										</h3>
										<form onSubmit={formik.handleSubmit}>
											<div className="mt-4">
												<div className="mt-4">
													<label className="block" htmlFor="">
														OTP
													</label>
													<input
														id="otp"
														type="text"
														placeholder="Please enter OTP"
														className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
														{...formik.getFieldProps('otp')}
													/>
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
									</>
								)}
							</div>
						</div>
					)}
				</Formik>
			)}
		</>
	);
};

export default ConfirmOTP;
