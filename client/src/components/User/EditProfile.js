import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loadUser } from '../../redux/actions/authAction';
import { clearErrors, editUserProfile } from '../../redux/actions/userAction';
import TitleBarPage from '../Layout/TitleBarPage';
import Loader from '../Layout/Loader/Loader';

const EditProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const { loading, error, isUpdated } = useSelector(
		(state) => state.profileUser
	);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState('');

	const updateProfileSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.set('name', name);
		formData.set('email', email);
		formData.set('avatar', avatar);
		// console.log(Object.fromEntries(formData));
		dispatch(editUserProfile(formData));
	};

	const addDataForm = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatar(user.avatar.url);
			setAvatarPreview(user.avatar.url);
		}

		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success('Your profile updated successfully !!');
			dispatch(loadUser());
			if (user.role === 'Admin') {
				navigate('/admin/profile');
			} else if (user.role === 'Staff') {
				navigate('/staff/profile');
			} else {
				navigate('/myProfile');
			}

			dispatch({
				type: 'UPDATE_PROFILE_RESET',
			});
		}
	}, [user, isUpdated, error, dispatch, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="flex items-center justify-center min-h-eightVH">
					<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
						<h3 className="text-2xl font-bold text-center">Edit my profile</h3>
						<ToastContainer className="toastify text-xs" />
						<TitleBarPage title="Update my profile" />
						<form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
							<div className="mt-4">
								<div>
									<label className="block" htmlFor="text">
										Name
									</label>
									<input
										type="text"
										placeholder="Please enter your name"
										className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="mt-4">
									<label className="block" htmlFor="email">
										Email
									</label>
									<input
										type="email"
										placeholder="Please enter your email"
										className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="mt-4">
									<label className="block">Avatar</label>

									<div className="flex items-center">
										<img
											className="inline-block mt-2 mr-1 h-8 w-8 rounded-full ring-2 ring-white"
											src={avatarPreview}
											alt=""
										/>
										<input
											type="file"
											name="avatar"
											className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
											accept="image/*"
											onChange={addDataForm}
										/>
									</div>
								</div>
								<div className="flex">
									<button
										type="submit"
										className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
									>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default EditProfile;
