import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	login,
	loginFacebook,
	loginGoogle,
} from '../../../redux/actions/authAction';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Loader from '../../Layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import './login.css';
import TitleBarPage from './../../Layout/TitleBarPage';

const Login = () => {
	const { error, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isLoggedIn } = useSelector((state) => state.auth);

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email format !!')
			.required('Please enter email !!'),
		password: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters !!'),
	});

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	const loginSubmit = (values) => {
		const { email, password } = values;
		dispatch(login(email, password));
		navigate('/');
	};

	const responseGoogle = async (response) => {
		const tokenId = response.tokenId;
		dispatch(loginGoogle(tokenId));
		navigate('/');
	};

	const responseFacebook = async (response) => {
		const { accessToken, userID } = response;
		dispatch(loginFacebook(accessToken, userID));
		navigate('/');
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<TitleBarPage title="Login" />
					<ToastContainer className="toastify" />

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={loginSubmit}
					>
						{(formik) => (
							<section class="h-screen">
								<div className="px-6 h-full text-gray-800">
									<div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
										<div className="grow-0 shrink-1 md:shrink-0 mt-4 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
											<img
												src="https://www.vietnamparadisetravel.com/wp-content/uploads/s/51/Sunrise-on-a-mountain-peak-in-Pu-Luong-Nature-Reserve-e1586766421247.jpg"
												className="w-full rounded-2xl"
												alt="Sample image"
											/>
										</div>
										<div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 mt-3">
											<form onSubmit={formik.handleSubmit}>
												<div className="flex flex-row items-center justify-center lg:justify-start">
													<p className="text-lg mb-0 mr-4">Login with</p>
													<GoogleLogin
														clientId="1013536877025-ip5p8e6fhvjilej5ln9049isudh7s3k0.apps.googleusercontent.com"
														buttonText="Login with google"
														onSuccess={responseGoogle}
														cookiePolicy={'single_host_origin'}
													/>
													<FacebookLogin
														appId="511104760214362"
														autoLoad={false}
														fields="name,email,picture"
														callback={responseFacebook}
													/>
												</div>

												<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
													<p className="text-center font-semibold mx-4 mb-0">
														Or
													</p>
												</div>

												<div className="mb-6">
													<input
														type="text"
														className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
														id="exampleFormControlInput2"
														placeholder="Email address"
														{...formik.getFieldProps('email')}
													/>
													{formik.touched.email && formik.errors.email ? (
														<div className="form_error">
															{formik.errors.email}
														</div>
													) : null}
												</div>

												<div className="mb-6">
													<input
														type="password"
														className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
														id="exampleFormControlInput2"
														placeholder="Password"
														{...formik.getFieldProps('password')}
													/>
													{formik.touched.password && formik.errors.password ? (
														<div className="form_error">
															{formik.errors.password}
														</div>
													) : null}
												</div>

												<div className="flex justify-between items-center mb-6">
													<div className="form-group form-check">
														<input
															type="checkbox"
															className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
															id="exampleCheck2"
														/>
														<label
															className="form-check-label inline-block text-gray-800"
															for="exampleCheck2"
														>
															Remember me
														</label>
													</div>
													<a href="#!" className="text-gray-800">
														Forgot password?
													</a>
												</div>

												<div className="text-center lg:text-left">
													<button
														type="submit"
														className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
													>
														Login
													</button>

													<p className="text-sm font-semibold mt-2 pt-1 mb-0">
														Don't have an account?
														<a
															href="#!"
															className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-4"
														>
															Register
														</a>
													</p>
												</div>
											</form>
										</div>
									</div>
								</div>
							</section>
						)}
					</Formik>
				</>
			)}
		</>
	);
};

export default Login;
