import React, { useEffect, useState } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createCar } from '../../../redux/actions/carAction';
import { useNavigate } from 'react-router-dom';

const CreateCar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, success: successCreate } = useSelector(
		(state) => state.newCar
	);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [seatCategory, setSeatCategory] = useState('');
	const [location, setLocation] = useState('');
	const [startDay, setStartDay] = useState('');
	const [endDay, setEndDay] = useState('');
	const [rentPerDay, setRentPerDay] = useState(1000);
	const [available, setAvailable] = useState(1);
	const [images, setImages] = useState([]);

	const locations = [
		'Da Nang',
		'Ha Noi',
		'Ho Chi Minh',
		'Can Tho',
		'Ca Mau',
		'Hai Phong',
		'Gia Lai',
		'Quang Nam',
	];

	const uploadImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImages((old) => [...old, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	const createCarSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('name', name);
		formData.set('description', description);
		formData.set('seatsCategory', seatCategory);
		formData.set('location', location);
		formData.set('startDay', startDay);
		formData.set('endDay', endDay);
		formData.set('rentPerDay', rentPerDay);
		formData.set('available', available);
		images.forEach((image) => {
			formData.append('images', image);
		});

		dispatch(createCar(formData));
		// console.log(Object.fromEntries(formData));
	};

	useEffect(() => {
		if (error) {
			toast.warn('Create not successful !! Duplicate car !!');
			dispatch(clearErrors());
		}

		if (successCreate) {
			toast.success('Create car successfully !!');
			navigate('/admin/manager/allCar');
		}
	}, [dispatch, error, successCreate, navigate]);

	const disablePastDate = () => {
		const today = new Date().toISOString().slice(0, 16);
		return today;
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<TitleBarPage title="Create a new car" />
			<div className="mt-10 sm:mt-0 p-4">
				<div className="md:grid md:grid-cols-1 md:gap-6">
					<div className="md:mt-0 md:col-span-2">
						<form encType="multipart/form-data" onSubmit={createCarSubmit}>
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 bg-white sm:p-6">
									<h3 className="text-2xl font-bold text-center">
										Create a new car
									</h3>
									<ToastContainer className="toastify text-xs" />
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-4">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Name
											</label>
											<input
												type="text"
												placeholder="Pleaser enter name"
												required
												value={name}
												onChange={(e) => setName(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										<div className="col-span-6 sm:col-span-4">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Description
											</label>
											<input
												type="text"
												placeholder="Pleaser enter description"
												required
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												Seat category
											</label>
											<select
												name="method"
												id="method"
												onChange={(e) => setSeatCategory(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											>
												<option value="">Please choose seat category</option>
												<option value="5">5</option>
												<option value="7">7</option>
												<option value="16">16</option>
												<option value="30">30</option>
											</select>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												Location
											</label>
											<select
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												onChange={(e) => setLocation(e.target.value)}
											>
												<option value="">Choose location</option>
												{locations.map((local) => (
													<option key={local} value={local}>
														{local}
													</option>
												))}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												Start day
											</label>
											<input
												type="datetime-local"
												value={startDay}
												min={disablePastDate()}
												onChange={(e) => setStartDay(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												End day
											</label>
											<input
												type="datetime-local"
												value={endDay}
												min={disablePastDate()}
												onChange={(e) => setEndDay(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												Rent per day
											</label>
											<input
												type="text"
												placeholder="Pleaser enter rent per day ($)"
												required
												value={rentPerDay}
												onChange={(e) => setRentPerDay(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												Available
											</label>
											<input
												type="number"
												placeholder="Pleaser enter available"
												required
												value={available}
												onChange={(e) => setAvailable(e.target.value)}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium text-gray-700"
											>
												Images
											</label>
											<input
												type="file"
												name="avatar"
												accept="image/*"
												multiple
												onChange={uploadImagesChange}
												className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 pb-3 bg-gray-50 text-right sm:px-6 text-center">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCar;
