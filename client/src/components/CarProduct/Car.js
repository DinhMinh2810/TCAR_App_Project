import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import { toast } from 'react-toastify';
import CarProductCard from '../Home/CarProductCard';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Slider } from '@mui/material';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
	ChevronDownIcon,
	FilterIcon,
	MinusSmIcon,
	PlusSmIcon,
	ViewGridIcon,
} from '@heroicons/react/solid';
import './car.css';
import Loader from '../Layout/Loader/Loader';
import CachedIcon from '@mui/icons-material/Cached';
import moment from 'moment';

const sortOptions = [
	{ name: 'Most Popular', href: '#', current: false },
	{ name: 'Newest', href: '#', current: false },
	{ name: 'Best Rating', href: '#', current: false },
];

const filters = [
	{
		id: 'seatCategory',
		name: 'Seat Category',
		options: [
			{ value: '5', label: '5 seats mini', checked: false },
			{ value: '7', label: '7 seats high ground', checked: false },
			{ value: '16', label: '16 seats high ground', checked: false },
			{ value: '30', label: '30 seats bus pickup', checked: false },
		],
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Car = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const { keyword, startDay, endDay } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [rentPerDay, setRentPerDay] = useState([0, 4000]);
	const [seatCategories, setSeatCategories] = useState('');
	const [ratings, setRatings] = useState(0);
	const [StartDay, setStartDay] = useState(startDay);
	const [EndDay, setEndDay] = useState(endDay);
	const [location, setLocation] = useState(keyword);

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

	const { loading, cars, error, carsCount, resultItemPage } = useSelector(
		(state) => state.carsProduct
	);
	console.log(StartDay);
	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}

		dispatch(
			getCars(
				location,
				StartDay,
				EndDay,
				currentPage,
				rentPerDay,
				seatCategories,
				ratings
			)
		);
	}, [
		dispatch,
		location,
		StartDay,
		EndDay,
		currentPage,
		rentPerDay,
		error,
		seatCategories,
		ratings,
	]);

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	const rentPerDayHandler = (event, newRentPerDay) => {
		setRentPerDay(newRentPerDay);
	};

	const refreshSearchHandler = (e) => {
		navigate('/carProduct/refreshSearch');
	};

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
								<div className="px-4 flex items-center justify-between">
									<h2 className="text-lg font-medium text-gray-900">Filters</h2>
									<button
										type="button"
										className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
										onClick={() => setMobileFiltersOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Filters */}
								<form className="mt-4 border-t border-gray-200">
									<div className=" px-4 py-2 mr-7">
										<p className="font-medium text-xl text-gray-900 pt-2">
											Price
										</p>
										<ul className="font-medium text-gray-900 px-2">
											<Slider
												className="block px-2 py-3"
												value={rentPerDay}
												onChange={rentPerDayHandler}
												valueLabelDisplay="auto"
												aria-labelledby="range-slider"
												min={0}
												max={9000}
											/>
										</ul>
									</div>

									{filters.map((section) => (
										<Disclosure
											as="div"
											key={section.id}
											className="border-t border-b border-gray-200 px-4 py-6"
										>
											{({ open }) => (
												<>
													<h3 className="-mx-2 -my-3 flow-root">
														<Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
															<span className="font-medium text-gray-900">
																{section.name}
															</span>
															<span className="ml-6 flex items-center">
																{open ? (
																	<MinusSmIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																) : (
																	<PlusSmIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																)}
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className="pt-6">
														<div className="space-y-6">
															{section.options.map((option, optionIdx) => (
																<div
																	key={option.value}
																	className="flex items-center"
																>
																	<input
																		id={`filter-mobile-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		type="checkbox"
																		defaultChecked={option.checked}
																		className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																	/>
																	<label
																		htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																		className="ml-3 min-w-0 flex-1 text-gray-500"
																	>
																		{option.label}
																	</label>
																</div>
															))}
														</div>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
									<div className="border-b border-gray-200 py-6 flex justify-center">
										<button className="px-8 py-2 btn_refresh_search border border-slate-300 rounded-md">
											<CachedIcon /> Refresh filter
										</button>
									</div>
								</form>
							</div>
						</Transition.Child>
					</Dialog>
				</Transition.Root>
				{/* Laptop */}

				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
						<h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
							New Cars
						</h1>

						<div className="flex items-center">
							<Menu
								as="div"
								className="relative inline-block text-left py-2 px-3 border border-slate-300 rounded"
							>
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										Sort
										<ChevronDownIcon
											className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<a
															href={option.href}
															className={classNames(
																option.current
																	? 'font-medium text-gray-900'
																	: 'text-gray-500',
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm'
															)}
														>
															{option.name}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">View grid</span>
								<ViewGridIcon className="w-5 h-5" aria-hidden="true" />
							</button>
							<button
								type="button"
								className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FilterIcon className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pt-6">
						<h2 id="products-heading" className="sr-only">
							Cars
						</h2>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
							{/* Filters */}
							<form className="hidden lg:block">
								<div className="border-b border-gray-200 pb-6">
									<p className="text-base">
										Start day: {moment(startDay).format('LLL')}
									</p>
									<p className="text-base">
										End day: {moment(endDay).format('LLL')}
									</p>
									<p className="text-base">Location: {keyword} city</p>
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
								{/* <div className="border-b border-gray-200 pb-6">
									<input
										type="datetime-local"
										value={StartDay}
										min={disablePastDate()}
										onChange={(e) => setStartDay(e.target.value)}
										className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
									<input
										type="datetime-local"
										value={EndDay}
										min={disablePastDate()}
										onChange={(e) => setEndDay(e.target.value)}
										className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
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
								</div> */}

								<div className="border-b border-gray-200 py-6">
									<p className="">Price</p>
									<Slider
										value={rentPerDay}
										onChange={rentPerDayHandler}
										valueLabelDisplay="auto"
										aria-labelledby="range-slider"
										min={0}
										max={9000}
									/>
								</div>

								<div className="border-b border-gray-200 py-6">
									<p className="">Ratings</p>
									<Slider
										value={ratings}
										onChange={(e, newRating) => {
											setRatings(newRating);
										}}
										valueLabelDisplay="auto"
										aria-labelledby="range-slider"
										min={0}
										max={5}
									/>
								</div>

								{filters.map((section) => (
									<Disclosure
										as="div"
										key={section.id}
										className="border-b border-gray-200 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
														<span className="font-medium text-gray-900">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-4">
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className="flex items-center"
															>
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	defaultChecked={option.checked}
																	className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																	onClick={() =>
																		setSeatCategories(option.value)
																	}
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className="ml-3 text-sm text-gray-600"
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
								<div className="border-b border-gray-200 py-6 flex justify-center">
									<button
										className="px-8 py-2 btn_refresh_search border border-slate-300 rounded-md"
										onClick={refreshSearchHandler}
									>
										<CachedIcon /> Refresh filter
									</button>
								</div>
							</form>

							{loading ? (
								<Loader />
							) : (
								<div className="lg:col-span-3">
									<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
										{cars &&
											cars.map((car) => (
												<CarProductCard key={car._id} car={car} />
											))}
									</div>
								</div>
							)}

							<div className="lg:col-span-6 flex justify-center">
								{resultItemPage < carsCount && (
									<Pagination
										activePage={currentPage}
										itemsCountPerPage={resultItemPage}
										totalItemsCount={carsCount}
										onChange={setCurrentPageNo}
										nextPageText="Next"
										prevPageText="Prev"
										firstPageText="1st"
										lastPageText="Last"
										itemClass="page-item"
										linkClass="page-link"
										activeClass="pageItemActive"
										activeLinkClass="pageLinkActive"
									/>
								)}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Car;
