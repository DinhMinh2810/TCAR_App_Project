import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from '../../../redux/actions/authAction';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
];

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const { user, isLoggedIn } = auth;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	const logoutSubmit = async () => {
		// dispatch(logout());
		// navigate('/');
		console.log('====================================');
		console.log(123);
		console.log('====================================');
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
										src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
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
								<Link
									to="/register"
									className="bg-gray-800 p-1 text-gray-400 hover:text-white mr-4"
								>
									Register
								</Link>
								<Link
									to="/login"
									className="bg-gray-800 p-1 text-gray-400 hover:text-white"
								>
									Login
								</Link>

								{/* Profile dropdown */}
								{/* <Menu as="div" className="ml-3 relative">
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
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<a
														href="#s"
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														My Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#s"
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Favorite car
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#s"
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="##"
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Logout
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu> */}
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
		// <div className="header">
		// 	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		// 		<Container className="login">
		// 			<Navbar.Brand className="navbar-brand1" href="#home">
		// 				React-Bootstrap
		// 			</Navbar.Brand>
		// 			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		// 			<Navbar.Collapse id="responsive-navbar-nav">
		// 				<Nav className="me-auto hide-on-mobile">
		// 					<Nav.Link href="#">Home</Nav.Link>
		// 					<Nav.Link href="#">Pricing</Nav.Link>
		// 					<Nav.Link href="#">Features</Nav.Link>
		// 				</Nav>

		// 				{isLoggedIn ? (
		// 					<>
		// 						<div className="header_res hide-on-pc">
		// 							<img
		// 								src={user?.avatar?.url}
		// 								alt=""
		// 								className="img-responsive"
		// 							/>
		// 							<span className="header_name">{user?.name}</span>
		// 						</div>

		// 						<div className="header_res hide-on-pc">
		// 							<span href="/myProfile" className="header_name">
		// 								Profile
		// 							</span>
		// 						</div>
		// 						<div className="header_res hide-on-pc">
		// 							<span className="header_name">Cart</span>
		// 						</div>
		// 						<div
		// 							className="header_res logout hide-on-pc"
		// 							onClick={logoutSubmit}
		// 						>
		// 							<span className="header_name">Logout</span>
		// 						</div>

		// 						<img
		// 							src={user?.avatar?.url}
		// 							width="50"
		// 							height="50"
		// 							className="img-responsive hide-on-mobile-tablet"
		// 							alt=""
		// 						/>
		// 						<NavDropdown
		// 							title={user?.name}
		// 							id="collasible-nav-dropdown"
		// 							className="hide-on-mobile-tablet"
		// 						>
		// 							<NavDropdown.Item href="/myProfile">Profile</NavDropdown.Item>
		// 							<NavDropdown.Item href="#action/3.2">Cart</NavDropdown.Item>
		// 							<NavDropdown.Item href="#action/3.3">
		// 								Something
		// 							</NavDropdown.Item>
		// 							<NavDropdown.Divider />
		// 							<NavDropdown.Item onClick={logoutSubmit}>
		// 								Logout
		// 							</NavDropdown.Item>
		// 						</NavDropdown>
		// 					</>
		// 				) : (
		// 					<Nav>
		// 						<Nav.Link href="/register">Register</Nav.Link>
		// 						<Nav.Link eventKey={2} href="/login">
		// 							Login
		// 						</Nav.Link>
		// 					</Nav>
		// 				)}
		// 			</Navbar.Collapse>
		// 		</Container>
		// 	</Navbar>
		// </div>
	);
};

export default Header;
