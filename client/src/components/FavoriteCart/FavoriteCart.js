import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCarsFromCart } from '../../redux/actions/favoriteCartActions';
import { FavoriteItemCard } from './FavoriteItemCard';
import { ToastContainer, toast } from 'react-toastify';
import TitleBarPage from './../Layout/TitleBarPage';
import { Link } from 'react-router-dom';

const FavoriteCart = () => {
	const dispatch = useDispatch();
	const { favoriteCartItems } = useSelector((state) => state.favoriteCart);

	const removeCarsCart = (id) => {
		dispatch(removeCarsFromCart(id));
		toast.success('Remove car successfully !!');
	};

	return (
		<>
			{favoriteCartItems.length === 0 ? (
				<div className="w-screen flex items-center mb-20">
					<div className="container flex flex-col  md:flex-row items-center justify-center text-gray-700 pt-40">
						<div className="max-w-md md: px-4">
							<div className="text-5xl font-dark font-bold">Empty 🤣🤣</div>
							<p className="text-2xl md:text-3xl font-light leading-normal mb-8 mt-4">
								You haven't added any cars to your favorite cart !!
							</p>
							<Link
								to="/carProduct/refreshSearch"
								className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
							>
								View car rental
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="container mx-auto mt-10">
						<div className="flex shadow-md my-10">
							<TitleBarPage title="Car favorite cart" />
							<ToastContainer className="toastify text-xs" />
							<div className="w-full bg-white px-10 py-10">
								<div className="flex justify-between border-b pb-8">
									<h1 className="font-semibold text-2xl">
										Car favorite cart 😍
									</h1>
								</div>
								<div className="flex mt-10 mb-5">
									<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
										Car Details
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Rent per day
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Start Day Free
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										End Day free
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Location
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										View details
									</h3>
								</div>

								{favoriteCartItems &&
									favoriteCartItems.map((item) => (
										<FavoriteItemCard
											key={item.car}
											item={item}
											removeCarsCart={removeCarsCart}
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FavoriteCart;
