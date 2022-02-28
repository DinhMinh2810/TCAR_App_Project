import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/actions/authAction';
import './register.css';
import TitleBarPage from './../../Layout/TitleBarPage';

const Register = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [avatar, setAvatar] = useState('');
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
			<Container>
				<Row lg={1} md={1} sm={1} xs={1}>
					<Col>
						<TitleBarPage title="Register" />

						<form
							className="form_container"
							encType="multipart/form-data"
							onSubmit={registerSubmit}
						>
							<h3 className="form_title">Register</h3>
							<div className="form_label">
								<label htmlFor="name" className="form_text">
									Name
								</label>
								<input
									type="text"
									placeholder="Please enter your name"
									required
									name="name"
									value={name}
									onChange={registerDataChange}
									className="form_input"
								/>
							</div>
							<div className="form_label">
								<label htmlFor="email" className="form_text">
									Email
								</label>
								<input
									type="email"
									placeholder="Please enter your Email"
									required
									name="email"
									value={email}
									onChange={registerDataChange}
									className="form_input"
								/>
							</div>
							<div className="form_label">
								<label htmlFor="name" className="form_text">
									Password
								</label>
								<input
									type="password"
									placeholder="Please enter your password"
									required
									name="password"
									value={password}
									onChange={registerDataChange}
									className="form_input"
								/>
							</div>

							<div className="form_label">
								<label htmlFor="name" className="form_text">
									Choose avatar
								</label>
								<input
									type="file"
									name="avatar"
									accept="image/*"
									onChange={registerDataChange}
								/>
							</div>
							<input type="submit" value="Register" className="formBtn" />
						</form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Register;
