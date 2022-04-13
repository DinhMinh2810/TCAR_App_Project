import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authAction';
import TitleBarPage from './../../Layout/TitleBarPage';
import { toast } from 'react-toastify';

const Register = () => {
	const dispatch = useDispatch();

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
		dispatch(register(formData));
		toast.success('Please check your email to register account !!');
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

	return (
		<>
			<TitleBarPage title="Register" />
			<form
				className="min-w-screen min-h-screen flex items-center justify-center px-5 pt-3"
				encType="multipart/form-data"
				onSubmit={registerSubmit}
			>
				<div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
					<div className="md:flex w-full">
						<div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
							<img
								className="w-full h-full rounded-lg"
								alt="register"
								src="https://assets.gaadi.com/production/img/gaadistore/sell-car.png"
							/>
						</div>
						<div className="w-full md:w-1/2 py-10 px-5 md:px-10">
							<div className="text-center mb-10">
								<h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
								<p>Enter your information to register</p>
							</div>
							<div>
								<div className="flex -mx-3">
									<div className="w-1/2 px-3 mb-5">
										<label htmlFor="" className="text-xs font-semibold px-1">
											User Name
										</label>
										<div className="flex">
											<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
												<i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
											</div>
											<input
												type="text"
												placeholder="Name"
												className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
												required
												name="name"
												value={name}
												onChange={addDataForm}
											/>
										</div>
									</div>
									<div className="w-1/2 px-3 mb-5">
										<label htmlFor="" className="text-xs font-semibold px-1">
											Email
										</label>
										<div className="flex">
											<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
												<i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
											</div>
											<input
												type="email"
												placeholder="Please enter your Email"
												className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
												required
												name="email"
												value={email}
												onChange={addDataForm}
											/>
										</div>
									</div>
								</div>

								<div className="flex -mx-3">
									<div className="w-full px-3 mb-5">
										<label htmlFor="" className="text-xs font-semibold px-1">
											Password
										</label>
										<div className="flex">
											<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
												<i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
											</div>
											<input
												type="password"
												placeholder="Please enter your Email"
												className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
												required
												name="password"
												value={password}
												onChange={addDataForm}
											/>
										</div>
									</div>
								</div>
								<div className="flex -mx-3">
									<div className="w-full px-3 mb-12">
										<label htmlFor="" className="text-xs font-semibold px-1">
											Avatar
										</label>
										<label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
											<div className="flex flex-col items-center justify-center pt-7">
												{avatar ? (
													<>
														<img
															className="w-12 h-12 text-gray-400 group-hover:text-gray-600 rounded-lg"
															src={avatar}
															alt="avatar"
														/>
														<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
															Choose photo successfully !!
														</p>
													</>
												) : (
													<>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
																clipRule="evenodd"
															/>
														</svg>
														<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
															Please select a photo
														</p>
													</>
												)}
											</div>
											<input
												type="file"
												name="avatar"
												required
												className="opacity-0"
												accept="image/*"
												onChange={addDataForm}
											/>
										</label>
									</div>
								</div>
								<div className="flex -mx-3">
									<div className="w-full px-3 mb-5">
										<button
											type="submit"
											value="Register"
											className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
										>
											REGISTER
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Register;
