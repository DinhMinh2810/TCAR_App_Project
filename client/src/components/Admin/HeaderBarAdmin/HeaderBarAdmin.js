import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/authAction';
import { Link } from 'react-router-dom';
import './headerBarAdmin.css';
import { TreeItem, TreeView } from '@mui/lab';

const HeaderBarAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutSubmit = async () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className="header_sideBar">
			<Link className="header_sideBar_img" to="/">
				<p>ss</p>
				<img
					src="data:image/jpeg;base64,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"
					alt="Ecommerce"
				/>
			</Link>
			<Link to="/admin/dashboard">
				<p>Dashboard</p>
			</Link>
			<Link to="">
				<TreeView>
					<TreeItem nodeId="1" label="Products">
						<Link to="/admin/products">
							<TreeItem nodeId="2" label="All" />
						</Link>

						<Link to="/admin/product">
							<TreeItem nodeId="3" label="Create" />
						</Link>
					</TreeItem>
				</TreeView>
			</Link>
			<Link to="/admin/orders">
				<p>Orders</p>
			</Link>
			<Link to="/admin/users">
				<p>Users</p>
			</Link>
			<Link to="/admin/reviews">
				<p>Reviews</p>
			</Link>
			{/* <div onClick={logoutSubmit} className="header_sideBar_btn">
				<button>Logout</button>
			</div> */}
			<div class="text-center bottom-0 w-full">
				<button
					class="py-2 text-sm text-gray-700 header_sideBar_btn"
					onClick={logoutSubmit}
				>
					Logout
				</button>
			</div>
		</div>
		// <div class="w-60 h-full shadow-md bg-white absolute" id="sidenavSecExample">
		// 	<div class="pt-4 pb-2 px-6">
		// 		<a href="#!">
		// 			<div class="flex items-center">
		// 				<div class="shrink-0">
		// 					<img
		// 						src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
		// 						class="rounded-full w-10"
		// 						alt="Avatar"
		// 					/>
		// 				</div>
		// 				<div class="grow ml-3">
		// 					<p class="text-sm font-semibold text-blue-600">Jason McCoel</p>
		// 				</div>
		// 			</div>
		// 		</a>
		// 	</div>
		// 	<ul class="relative px-1">
		// 		<li class="relative">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 				href="#!"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 512 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
		// 					></path>
		// 				</svg>
		// 				<a href="/login" className="text-black">
		// 					Non-collapsible link
		// 				</a>
		// 			</a>
		// 		</li>
		// 		<li class="relative" id="sidenavSecEx2">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 				data-bs-toggle="collapse"
		// 				data-bs-target="#collapseSidenavSecEx2"
		// 				aria-expanded="false"
		// 				aria-controls="collapseSidenavSecEx2"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 496 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
		// 					></path>
		// 				</svg>
		// 				<span>Collapsible item 1</span>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 ml-auto"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 448 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
		// 					></path>
		// 				</svg>
		// 			</a>
		// 			<ul
		// 				class="relative accordion-collapse collapse"
		// 				id="collapseSidenavSecEx2"
		// 				aria-labelledby="sidenavSecEx2"
		// 				data-bs-parent="#sidenavSecExample"
		// 			>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 1
		// 					</a>
		// 				</li>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 2
		// 					</a>
		// 				</li>
		// 			</ul>
		// 		</li>
		// 		<li class="relative" id="sidenavSecEx3">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 				data-bs-toggle="collapse"
		// 				data-bs-target="#collapseSidenavSecEx3"
		// 				aria-expanded="false"
		// 				aria-controls="collapseSidenavSecEx3"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 512 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
		// 					></path>
		// 				</svg>
		// 				<span>Collapsible item 2</span>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 ml-auto"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 448 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
		// 					></path>
		// 				</svg>
		// 			</a>
		// 			<ul
		// 				class="relative accordion-collapse collapse"
		// 				id="collapseSidenavSecEx3"
		// 				aria-labelledby="sidenavSecEx3"
		// 				data-bs-parent="#sidenavSecExample"
		// 			>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 3
		// 					</a>
		// 				</li>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 4
		// 					</a>
		// 				</li>
		// 			</ul>
		// 		</li>
		// 	</ul>
		// 	<hr class="my-2" />
		// 	<ul class="relative px-1">
		// 		<li class="relative">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 				href="#!"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 512 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
		// 					></path>
		// 				</svg>
		// 				<span>Non-collapsible link</span>
		// 			</a>
		// 		</li>
		// 		<li class="relative" id="sidenavXxEx2">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 				data-bs-toggle="collapse"
		// 				data-bs-target="#collapseSidenavXxEx2"
		// 				aria-expanded="false"
		// 				aria-controls="collapseSidenavXxEx2"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					data-icon="comments"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 576 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
		// 					></path>
		// 				</svg>
		// 				<span>Collapsible item 3</span>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 ml-auto"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 448 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
		// 					></path>
		// 				</svg>
		// 			</a>
		// 			<ul
		// 				class="relative accordion-collapse collapse"
		// 				id="collapseSidenavXxEx2"
		// 				aria-labelledby="sidenavXxEx2"
		// 				data-bs-parent="#sidenavSecExample"
		// 			>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 5
		// 					</a>
		// 				</li>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 6
		// 					</a>
		// 				</li>
		// 			</ul>
		// 		</li>
		// 		<li class="relative" id="sidenavXxEx3">
		// 			<a
		// 				class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
		// 				data-mdb-ripple="true"
		// 				data-mdb-ripple-color="primary"
		// 				data-bs-toggle="collapse"
		// 				data-bs-target="#collapseSidenavXxEx3"
		// 				aria-expanded="false"
		// 				aria-controls="collapseSidenavXxEx3"
		// 			>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 mr-3"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 512 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"
		// 					></path>
		// 				</svg>
		// 				<span>Collapsible item 4</span>
		// 				<svg
		// 					aria-hidden="true"
		// 					focusable="false"
		// 					data-prefix="fas"
		// 					class="w-3 h-3 ml-auto"
		// 					role="img"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					viewBox="0 0 448 512"
		// 				>
		// 					<path
		// 						fill="currentColor"
		// 						d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
		// 					></path>
		// 				</svg>
		// 			</a>
		// 			<ul
		// 				class="relative accordion-collapse collapse"
		// 				id="collapseSidenavXxEx3"
		// 				aria-labelledby="sidenavXxEx3"
		// 				data-bs-parent="#sidenavSecExample"
		// 			>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 7
		// 					</a>
		// 				</li>
		// 				<li class="relative">
		// 					<a
		// 						href="#!"
		// 						class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
		// 						data-mdb-ripple="true"
		// 						data-mdb-ripple-color="primary"
		// 					>
		// 						Link 8
		// 					</a>
		// 				</li>
		// 			</ul>
		// 		</li>
		// 	</ul>
		// 	<div class="text-center bottom-0 absolute w-full">
		// 		<hr class="m-0" />
		// 		<button class="py-2 text-sm text-gray-700" onClick={logoutSubmit}>
		// 			Logout
		// 		</button>
		// 	</div>
		// </div>
	);
};

export default HeaderBarAdmin;
