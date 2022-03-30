import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from '../../../redux/actions/authAction';
import logo from '../../../assets/images/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { myBooking, myUserBooking } from '../../../redux/actions/bookingAction';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Car', href: '/carProduct/refreshSearch', current: false },
	{ name: 'Projects', href: '/', current: false },
	{ name: 'Calendar', href: '/', current: false },
];

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const { user, isLoggedIn } = auth;
	const { user: userSocial } = useSelector((state) => state.loginWithSocial);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userSocial) {
			dispatch(loadUser());
		}

		dispatch(loadUser());
	}, [dispatch, userSocial]);

	const logoutSubmit = async () => {
		dispatch(logout());
		toast.success('Logout successfully !!');
		navigate('/');
	};

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img
										className="hidden lg:block h-8 w-auto"
										src={logo}
										alt="Workflow"
									/>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								{isLoggedIn ? (
									<>
										<button
											type="button"
											className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										>
											<span className="sr-only">View notifications</span>
											<BellIcon className="h-6 w-6" aria-hidden="true" />
										</button>
										<Menu as="div" className="mx-3 relative">
											<div>
												<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src={user?.avatar?.url}
														alt=""
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
												{user?.role === 'User' ? (
													<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/myProfile"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	👨🏼 My Profile
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/favoriteCart"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	💙 Favorite car
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/myBooking"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																	onClick={() => {
																		dispatch(myBooking());
																	}}
																>
																	🚖 My booking car
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to=""
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	💬 Message
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<a
																	onClick={logoutSubmit}
																	href
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	⭕️ Logout
																</a>
															)}
														</Menu.Item>
													</Menu.Items>
												) : (
													<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/myProfile"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	👨🏼 My Profile
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/driver/myCarAssign"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	🚖 My car assign
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to="/driver/myUserBook"
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																	onClick={() => {
																		dispatch(myUserBooking(1));
																	}}
																>
																	🆕 My car user book
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	to=""
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	💬 Message
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<a
																	onClick={logoutSubmit}
																	href
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm text-gray-700'
																	)}
																>
																	⭕️ Logout
																</a>
															)}
														</Menu.Item>
													</Menu.Items>
												)}
											</Transition>
										</Menu>
									</>
								) : (
									<>
										<Link
											to="/register"
											className="bg-gray-800 p-1 text-gray-400 hover:text-white mr-4"
										>
											Register
										</Link>
										<Link
											to="/login"
											className="bg-gray-800 p-1 text-gray-400 hover:text-white mr-4"
										>
											Login
										</Link>
									</>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
