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
import { Container, Row, Col } from 'react-bootstrap';
import TitleBarPage from './../../Layout/TitleBarPage';

const Login = () => {
	const { error, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
					<Container>
						<Row xl={1} lg={1} md={1} sm={1} xs={1}>
							<Col>
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={loginSubmit}
								>
									{(formik) => (
										<form onSubmit={formik.handleSubmit}>
											<div className="login_form">
												<h2 className="login_text">Login</h2>
												<div className="login_form-label">
													<div className="login_text_dispatch">
														<label
															htmlFor="email"
															className="register_form-text"
														>
															Email
														</label>
													</div>
													<input
														id="email"
														type="email"
														className="register_form-input"
														placeholder="Please enter your email"
														{...formik.getFieldProps('email')}
													/>
												</div>
												{formik.touched.email && formik.errors.email ? (
													<div className="form_error">
														{formik.errors.email}
													</div>
												) : null}

												<div className="login_form-label">
													<div className="login_text_dispatch">
														<label
															htmlFor="password"
															className="register_form-text"
														>
															Password
														</label>
													</div>
													<input
														id="password"
														type="password"
														className="register_form-input"
														placeholder="Please enter your password !"
														{...formik.getFieldProps('password')}
													/>
												</div>
												{formik.touched.password && formik.errors.password ? (
													<div className="form_error">
														{formik.errors.password}
													</div>
												) : null}
												<div className="form_button">
													<button type="submit" className="button">
														Submit
													</button>
												</div>
											</div>
										</form>
									)}
								</Formik>
								<div className="social_login">
									<GoogleLogin
										clientId="1013536877025-ip5p8e6fhvjilej5ln9049isudh7s3k0.apps.googleusercontent.com"
										buttonText="Login with google"
										onSuccess={responseGoogle}
										cookiePolicy={'single_host_origin'}
										className="social_button_gg"
									/>

									<FacebookLogin
										appId="511104760214362"
										autoLoad={false}
										fields="name,email,picture"
										callback={responseFacebook}
										className="social_button_fb"
									/>
								</div>
							</Col>
						</Row>
					</Container>
				</>
			)}
		</>
	);
};

export default Login;
