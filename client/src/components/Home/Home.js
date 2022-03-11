import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import CarProductCard from './CarProductCard';
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import TitleBarPage from '../Layout/TitleBarPage';
import Partner from './Partner';
import Blog from './Blog';
import GuideRental from './GuideRental';

const products = [
	{
		id: 1,
		name: 'Basic Tee',
		href: '#',
		imageSrc:
			'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/KWID/8593/Renault-KWID-Climber-1.0-AMT-Opt-DT/1630912585387/front-left-side-47.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		price: '$35',
		color: 'Black',
	},
	// More products...
];

const Home = () => {
	const dispatch = useDispatch();
	const { cars, error } = useSelector((state) => state.carsProduct);
	const [keyword, setKeyword] = useState('');
	let navigate = useNavigate();

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/carProduct/${keyword}`);
		} else {
			navigate('/carProduct');
		}
	};

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		dispatch(getCars());
	}, [dispatch, error]);

	return (
		<>
			<TitleBarPage title="Home" />
			<div>
				<div className="py-16 bg-gradient-to-b from-indigo-700 to-indigo-600 flex justify-center items-center">
					<div>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-10 text-white">
							How can we help you?
						</h1>
						<div className="bg-indigo-800 rounded relative mt-6 lg:mt-14 py-4 pl-4 flex items-center w-full">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-search"
									width={16}
									height={16}
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#ffffff"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<circle cx={10} cy={10} r={7} />
									<line x1={21} y1={21} x2={15} y2={15} />
								</svg>
							</div>
							<input
								type="text"
								placeholder="Search for answers"
								className=" ml-4 w-full bg-transparent text-base leading-none text-white placeholder-white focus:outline-none"
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Product */}

			<div className="bg-white">
				<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
						Customers also purchased
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="w-full h-full object-center object-cover lg:w-full lg:h-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.color}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<GuideRental />

			<Blog />
			<Partner />

			{/* <form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="Search a Product ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
			<div>
				{cars && cars.map((car) => <CarProductCard key={car._id} car={car} />)}
			</div> */}
		</>
	);
};

export default Home;
