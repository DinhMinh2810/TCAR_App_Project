import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
	const navigate = useNavigate();
	const { loading, isLoggedIn, user } = useSelector((state) => state.auth);
	const { error, isUpdated } = useSelector((state) => state.profileUser);

	useEffect(() => {
		if (isLoggedIn === false) {
			navigate('/login');
		}
		if (isUpdated) {
			toast.success(isUpdated);
		}
	}, [isLoggedIn, navigate, isUpdated]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="h-full p-4 mt-10">
					<div className="border-b-2 block md:flex">
						<div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
							<div className="flex justify-between">
								<span className="text-xl font-semibold block">My Profile</span>
								<ToastContainer className="toastify" />
								<Link
									to="/user/changePassword"
									className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
								>
									Change password
								</Link>
							</div>

							<span className="text-gray-600 pt-2 inline-block">
								This information is secret so be careful
							</span>
							<div className="w-full p-8 mx-2 flex justify-center">
								<img
									id="showImage"
									className="max-w-xs w-44 rounded-lg items-center border"
									src={user?.avatar?.url}
									alt=""
								/>
							</div>

							<Link
								to="/user/editProfile"
								className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 p-8 mx-2 flex justify-center"
							>
								Edit Profile
							</Link>
						</div>

						<div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
							<div className="rounded  shadow p-6">
								<div className="pb-6">
									<label
										htmlFor="name"
										className="font-semibold text-gray-700 block pb-1"
									>
										User Name
									</label>
									<div className="flex">
										<input
											disabled
											id="username"
											className="border-1  rounded-r px-4 py-2 w-full"
											type="text"
											value={user?.name}
										/>
									</div>
								</div>
								<div className="pb-6">
									<label
										htmlFor="name"
										className="font-semibold text-gray-700 block pb-1"
									>
										Email
									</label>
									<div className="flex">
										<input
											disabled
											id="username"
											className="border-1  rounded-r px-4 py-2 w-full"
											type="text"
											value={user?.email}
										/>
									</div>
								</div>
								<div className="pb-4">
									<label
										htmlFor="about"
										className="font-semibold text-gray-700 block pb-1"
									>
										Joined on
									</label>
									<input
										disabled
										id="email"
										className="border-1  rounded-r px-4 py-2 w-full"
										type="email"
										value={String(user?.createdAt)?.substr(0, 10)}
									/>
									<span className="text-gray-600 pt-4 block opacity-70">
										Welcome to Tourist car rental !!
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
