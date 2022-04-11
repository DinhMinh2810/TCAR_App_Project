import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions/authAction';
import { toast } from 'react-toastify';
import TitleBarPage from './../../Layout/TitleBarPage';
import Loader from '../../Layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useParams();
	const { loading } = useSelector((state) => state.forgotPassword);

	const initialValues = {
		password: '',
		cfPassword: '',
	};

	const validationSchema = Yup.object({
		password: Yup.string().required('Please enter password !!'),
		cfPassword: Yup.string()
			.required('Please enter password !!')
			.oneOf([Yup.ref('password'), null], 'Passwords must match !!'),
	});

	const resetPWSubmit = (values) => {
		dispatch(resetPassword(token, values));
		navigate('/login');
		toast.success('Reset password successfully !! Please login again !!');
	};

	return (
		<>
			<TitleBarPage title="Reset Password" />
			{loading ? (
				<Loader />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={resetPWSubmit}
				>
					{(formik) => (
						<div className="flex items-center justify-center min-h-eightVH">
							<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
								<h3 className="text-2xl font-bold text-center">
									Reset password
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
												<div className="form_error">
													{formik.errors.password}
												</div>
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
			)}
		</>
	);
}

export default ResetPassword;
