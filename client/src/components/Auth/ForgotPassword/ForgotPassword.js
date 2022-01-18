import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../redux/actions/authAction';
import './ForgotPassword.css';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const initialValues = {
		email: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email format !!')
			.required('Please enter email !!'),
	});

	const forgotSubmit = (email) => {
		dispatch(forgotPassword(email));
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={forgotSubmit}
		>
			{(formik) => (
				<div>
					<form onSubmit={formik.handleSubmit}>
						<h1>Forgot password</h1>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" {...formik.getFieldProps('email')} />
						{formik.touched.email && formik.errors.email ? (
							<div className="haha">{formik.errors.email}</div>
						) : null}

						<button type="submit" disabled={!formik.isValid}>
							Submit
						</button>
					</form>
				</div>
			)}
		</Formik>
	);
};

export default ForgotPassword;
