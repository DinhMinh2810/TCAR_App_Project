import React, { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Search = () => {
	const [startDay, setStartDay] = useState('');
	const [endDay, setEndDay] = useState('');
	const [keyword, setKeyword] = useState('');

	const navigate = useNavigate();
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

	const disablePastDate = () => {
		const today = new Date().toISOString().slice(0, 16);
		return today;
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim() && startDay.trim() && endDay.trim()) {
			navigate(`/carProduct/${keyword}/${startDay}/${endDay}`);
		} else {
			toast.warn('Please choose time day and location !!');
		}
	};

	return (
		<div className="h-50 bg">
			<div className="container h-screen mx-auto flex justify-center items-center md:p-0">
				<div className="relative z-10 border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-20 ">
					<div className="flex justify-center">
						<p className="font-bold text-2xl">
							TCAR - always with you on every journey 🤣🤣
						</p>
					</div>
					<div className="flex justify-center">
						<p className="text-base">
							Please find car from 9:00 AM today to 9:00 AM next day
						</p>
					</div>
					<form onSubmit={searchSubmitHandler}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="grid grid-cols-1 gap-2 border border-gray-200 p-2 rounded">
								<div className="flex items-center ">
									<p>Start Day</p>
								</div>
								<div className="flex border rounded bg-gray-300 items-center p-2 ">
									<AccessTimeIcon className="fill-current text-gray-800 mr-2 w-5" />

									<input
										type="datetime-local"
										min={disablePastDate()}
										onChange={(e) => setStartDay(e.target.value)}
										className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
									/>
								</div>
								<div className="flex items-center ">
									<p>End Day</p>
								</div>
								<div className="flex border rounded bg-gray-300 items-center p-2 ">
									<AccessTimeIcon className="fill-current text-gray-800 mr-2 w-5" />
									<input
										type="datetime-local"
										min={disablePastDate()}
										onChange={(e) => setEndDay(e.target.value)}
										className="bg-gray-300 max-w-full focus:outline-none text-gray-700"
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-2 border border-gray-200 p-2 rounded">
								<div className="flex border rounded bg-gray-300 items-center justify-center py-2 px-6 ">
									<LocationOnIcon className="fill-current text-gray-800 mr-2 w-5" />

									<select
										className="bg-gray-300 max-w-full focus:outline-none text-gray-700 border border-black p-2 rounded"
										onChange={(e) => setKeyword(e.target.value)}
									>
										<option value="">Choose location</option>
										{locations.map((local) => (
											<option key={local} value={local}>
												{local}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="flex justify-center pt-4">
							<input
								type="submit"
								value="Search"
								className="p-2 border w-1/4 rounded-md bg-gray-800 text-white"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Search;
