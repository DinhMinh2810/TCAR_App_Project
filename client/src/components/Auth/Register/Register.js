import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authAction';


const Register = () => {
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [avatar, setAvatar] = useState('/123');
	const [avatarPreview, setAvatarPreview] = useState('Profile');

	const { name, email, password } = user;

	const registerSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set('name', name);
		myForm.set('email', email);
		myForm.set('password', password);
		myForm.set('avatar', avatar);
		dispatch(register(myForm));
	};

	const registerDataChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	return (
		<>
			<Fragment>
				<div className="LoginSignUpContainer">
					<div className="LoginSignUpBox">
						<form
							className="signUpForm"
							encType="multipart/form-data"
							onSubmit={registerSubmit}
						>
							<div className="signUpName">
								<input
									type="text"
									placeholder="Name"
									required
									name="name"
									value={name}
									onChange={registerDataChange}
								/>
							</div>
							<div className="signUpEmail">
								<input
									type="email"
									placeholder="Email"
									required
									name="email"
									value={email}
									onChange={registerDataChange}
								/>
							</div>
							<div className="signUpPassword">
								<input
									type="password"
									placeholder="Password"
									required
									name="password"
									value={password}
									onChange={registerDataChange}
								/>
							</div>

							<div id="registerImage">
								<input
									type="file"
									name="avatar"
									accept="image/*"
									onChange={registerDataChange}
								/>
							</div>
							<input type="submit" value="Register" className="signUpBtn" />
						</form>
					</div>
				</div>
			</Fragment>
		</>
	);
};

export default Register;
