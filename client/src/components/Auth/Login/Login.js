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
import './Login.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
	const { error, loading, isLoggedIn } = useSelector((state) => state.auth);
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
	};

	const responseFacebook = async (response) => {
		const { accessToken, userID } = response;
		dispatch(loginFacebook(accessToken, userID));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<ToastContainer className="toastify" />
					<Container>
						<Row xl={1} lg={1} md={1} sm={1} xs={1}>
							<Col>
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" />
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" />
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form>
							</Col>
						</Row>
					</Container>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={loginSubmit}
					>
						{(formik) => (
							<form onSubmit={formik.handleSubmit}>
								<div className="register_form">
									<h1>Login</h1>
									<div className="register_form-label">
										<label htmlFor="email" className="register_form-text">
											Email
										</label>
										<input
											id="email"
											type="email"
											{...formik.getFieldProps('email')}
										/>
									</div>
									{formik.touched.email && formik.errors.email ? (
										<div className="form_error">{formik.errors.email}</div>
									) : null}
									<div className="register_form-label">
										<label htmlFor="password" className="register_form-text">
											password
										</label>
										<input
											id="password"
											type="password"
											className="register_form-input"
											{...formik.getFieldProps('password')}
										/>
									</div>
									{formik.touched.password && formik.errors.password ? (
										<div className="form_error">{formik.errors.password}</div>
									) : null}

									<button type="submit">Submit</button>
								</div>
							</form>
						)}
					</Formik>
					<div className="social">
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
				</>
			)}
		</>
	);
};

export default Login;
