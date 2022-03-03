import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import TitleBarPage from './../../Layout/TitleBarPage';
import { useEffect } from 'react';
import Loader from '../../Layout/Loader/Loader';

const ConfirmOTP = () => {
	const dispatch = useDispatch();
	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const initialValues = {
		email: message?.email,
		OTP: '',
	};

	const validationSchema = Yup.object({
		OTP: Yup.string().required('Please enter phone !!'),
	});

	const confirmOtpSubmit = (values) => {
		const { email, phoneNumber, method } = values;
		// dispatch(forgotPassword(email, phoneNumber, method));
		// navigate('/api/resetPassword/:token');
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		if (message) {
			toast.warn(message);
		}
	}, [dispatch, error, message]);

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
								<h3 className="text-2xl font-bold text-center">Confirm OTP</h3>
								<form onSubmit={formik.handleSubmit}>
									<div className="mt-4">
										{/* <div>
											<label className="block" htmlFor="email">
												Email
											</label>
											<input
												id="email"
												type="email"
												placeholder="Please enter email"
												className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
												{...formik.getFieldProps('email')}
											/>
											{formik.touched.email && formik.errors.email ? (
												<div className="form_error">{formik.errors.email}</div>
											) : null}
										</div> */}
										<div className="mt-4">
											<label className="block" htmlFor="email">
												OTP
											</label>
											<input
												id="OTP"
												type="OTP"
												placeholder="Please enter OTP"
												className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
												{...formik.getFieldProps('OTP')}
											/>
											{formik.touched.OTP && formik.errors.OTP ? (
												<div className="form_error">{formik.errors.OTP}</div>
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
			)}
		</>
	);
};

export default ConfirmOTP;
