import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialState = {
	password: '',
	cf_password: '',
	err: '',
	success: '',
};

function ResetPassword() {
	const [data, setData] = useState(initialState);
	const { token } = useParams();

	const { password, cf_password, err, success } = data;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value, err: '', success: '' });
	};

	const handleResetPass = async () => {
		try {
			const res = await axios.post(
				'/api/resetPassword',
				{ password },
				{
					headers: { Authorization: token },
				}
			);

			return setData({ ...data, err: '', success: res.data.msg });
		} catch (err) {
			err.response.data.msg &&
				setData({ ...data, err: err.response.data.msg, success: '' });
		}
	};

	return (
		<div className="fg_pass">
			<h2>Reset Your Password</h2>

			<div className="row">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={handleChangeInput}
				/>

				<label htmlFor="cf_password">Confirm Password</label>
				<input
					type="password"
					name="cf_password"
					id="cf_password"
					value={cf_password}
					onChange={handleChangeInput}
				/>

				<button onClick={handleResetPass}>Reset Password</button>
			</div>
		</div>
	);
}

export default ResetPassword;
