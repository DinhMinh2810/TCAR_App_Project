import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors } from '../../../redux/actions/adminAction';
import { createAccountDriver } from '../../../redux/actions/staffAction';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import TitleBarPage from './../../Layout/TitleBarPage';

const CreateAccDriver = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { users, error } = useSelector((state) => state.CRUDAccDriver);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;
	const [avatar, setAvatar] = useState('');

	const registerSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('name', name);
		formData.set('email', email);
		formData.set('password', password);
		formData.set('avatar', avatar);
		// console.log(Object.fromEntries(formData))
		dispatch(createAccountDriver(formData));
	};

	const addDataForm = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		if (users) {
			toast.success('Create account driver success !!');
			navigate('/staff/manager/accDriver');
			dispatch({ type: 'CREATE_ACC_DRIVER_RESET' });
		}
	}, [error, dispatch, users, navigate]);

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Create account driver" />
			<div className="flex items-center justify-center min-h-eightVH">
				<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
					<h3 className="text-2xl font-bold text-center">
						Create account driver
					</h3>
					<form encType="multipart/form-data" onSubmit={registerSubmit}>
						<div className="mt-4">
							<div>
								<label className="block" htmlFor="text">
									Name
								</label>
								<input
									type="text"
									placeholder="Please enter name"
									className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
									required
									name="name"
									value={name}
									onChange={addDataForm}
								/>
							</div>

							<div className="mt-4">
								<label className="block" htmlFor="email">
									Email
								</label>
								<input
									type="email"
									placeholder="Please enter email"
									className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
									required
									name="email"
									value={email}
									onChange={addDataForm}
								/>
							</div>

							<div className="mt-4">
								<label className="block" htmlFor="email">
									Password
								</label>
								<input
									type="password"
									placeholder="Please enter password"
									className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
									required
									name="password"
									value={password}
									onChange={addDataForm}
								/>
							</div>

							<div className="mt-4">
								<label className="block">Avatar</label>

								<input
									type="file"
									name="avatar"
									required
									className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
									accept="image/*"
									onChange={addDataForm}
								/>
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
		</div>
	);
};

export default CreateAccDriver;
