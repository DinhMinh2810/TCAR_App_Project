import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authAction';

const Register = () => {
	const dispatch = useDispatch();

	const initialValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		avatar: '',
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Please enter user name !!'),
		email: Yup.string()
			.email('Invalid email format !!')
			.required('Please enter email !!'),
		password: Yup.string()
			.required('Please enter password !!')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Please enter confirm password !!')
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	});

	const registerSubmit = (values) => {
		const { name, email, password, confirmPassword, avatar } = values;
		dispatch(register(name, email, password, avatar));
		// navigate('/');
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={registerSubmit}
		>
			{(formik) => (
				<form onSubmit={formik.handleSubmit}>
					<h1>Register</h1>
					<label htmlFor="name">User Name</label>
					<input id="name" type="name" {...formik.getFieldProps('name')} />
					{formik.touched.name && formik.errors.name ? (
						<div>{formik.errors.name}</div>
					) : null}

					<label htmlFor="email">Email</label>
					<input id="email" type="email" {...formik.getFieldProps('email')} />
					{formik.touched.email && formik.errors.email ? (
						<div>{formik.errors.email}</div>
					) : null}

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						{...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div>{formik.errors.password}</div>
					) : null}

					<label htmlFor="password">Confirm Password</label>
					<input
						id="confirmPassword"
						type="password"
						{...formik.getFieldProps('confirmPassword')}
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
						<div>{formik.errors.confirmPassword}</div>
					) : null}

					<label htmlFor="avatar">Avatar</label>
					<input
						id="avatar"
						type="file"
						accept="image/*"
						{...formik.getFieldProps('avatar')}
					/>
					{formik.touched.avatar && formik.errors.avatar ? (
						<div>{formik.errors.avatar}</div>
					) : null}

					<button type="submit" disabled={!formik.isValid}>
						Submit
					</button>
				</form>
			)}
		</Formik>
	);
};

export default Register;
