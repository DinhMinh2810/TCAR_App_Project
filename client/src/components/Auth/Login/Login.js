import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	login,
	loginFacebook,
	loginGoogle,
} from '../../../redux/actions/authAction';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = () => {
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
	);
};

export default Login;
