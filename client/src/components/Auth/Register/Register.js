import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authAction';
import { Container, Row, Col } from 'react-bootstrap';
import './Register.css';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required('Please enter user name !!')
			.min(4, 'Name must be at least 4 characters'),
		email: Yup.string()
			.email('Invalid email format !!')
			.required('Please enter email !!'),
		password: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters !!'),
		confirmPassword: Yup.string()
			.required('Please enter confirm password !!')
			.oneOf([Yup.ref('password'), null], 'Passwords must match !!'),
	});

	const registerSubmit = (values) => {
		const { name, email, password } = values;

		dispatch(register(name, email, password));
		navigate('/');
	};

	return (
		<div className="register">
			<Container>
				<Row lg={1} md={1} sm={1} xs={1}>
					<Col>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={registerSubmit}
						>
							{(formik) => (
								<form onSubmit={formik.handleSubmit}>
									<div className="register_form">
										<h1>Register</h1>
										<div className="register_form-label">
											<label htmlFor="name" className="register_form-text">
												User Name
											</label>
											<input
												id="name"
												type="name"
												{...formik.getFieldProps('name')}
											/>
										</div>
										{formik.touched.name && formik.errors.name ? (
											<div className="form_error">{formik.errors.name}</div>
										) : null}
										<div className="register_form-label">
											<label htmlFor="email" className="register_form-text">
												Email
											</label>
											<input
												id="email"
												type="email"
												className="register_form-input"
												{...formik.getFieldProps('email')}
											/>
										</div>
										{formik.touched.email && formik.errors.email ? (
											<div className="form_error">{formik.errors.email}</div>
										) : null}

										<div className="register_form-label">
											<label htmlFor="password">Password</label>
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
										<div className="register_form-label">
											<label htmlFor="password">Confirm Password</label>
											<input
												id="confirmPassword"
												type="password"
												className="register_form-input"
												{...formik.getFieldProps('confirmPassword')}
											/>
										</div>
										{formik.touched.confirmPassword &&
										formik.errors.confirmPassword ? (
											<div className="form_error">
												{formik.errors.confirmPassword}
											</div>
										) : null}

										{/* <div className="register_form-label">
											<label htmlFor="password">Avatar</label>
											<input
												id="avatar"
												type="file"
												accept="image/*"
												className="register_form-input"
												{...formik.getFieldProps('avatar')}
											/>
										</div> */}

										<button type="submit">Submit</button>
									</div>
								</form>
							)}
						</Formik>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Register;
