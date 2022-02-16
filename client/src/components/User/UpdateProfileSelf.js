import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

const UpdateProfileSelf = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState('1');

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('name', name);
		myForm.set('email', email);
		myForm.set('avatar', avatar);
		console.log('====================================');
		console.log(myForm);
		console.log('====================================');
		// dispatch(updateProfile(myForm));
	};

	const updateProfileDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<Fragment>
			<div className="updateProfileContainer">
				<div className="updateProfileBox">
					<h2 className="updateProfileHeading">Update Profile</h2>

					<form
						className="updateProfileForm"
						encType="multipart/form-data"
						onSubmit={updateProfileSubmit}
					>
						<div className="updateProfileName">
							<input
								type="text"
								placeholder="Name"
								required
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div id="updateProfileImage">
							<img src={avatarPreview} alt="Avatar Preview" />
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={updateProfileDataChange}
							/>
						</div>
						<input type="submit" value="Update" className="updateProfileBtn" />
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProfileSelf;
