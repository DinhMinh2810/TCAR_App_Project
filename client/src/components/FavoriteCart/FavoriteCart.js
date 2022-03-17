import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addCarsToCart,
	removeCarsFromCart,
} from '../../redux/actions/favoriteCartActions';
import { FavoriteItemCard } from './FavouriteItemCard/FavoriteItemCard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { ToastContainer, toast } from 'react-toastify';
import TitleBarPage from './../Layout/TitleBarPage';
import { Link } from 'react-router-dom';

const FavoriteCart = () => {
	const dispatch = useDispatch();
	const { favoriteCartItems } = useSelector((state) => state.favoriteCart);

	const increaseQuantity = (id, quantity, available) => {
		const newQuantity = quantity + 1;
		dispatch(addCarsToCart(id, newQuantity));
	};

	const decreaseQuantity = (id, quantity) => {
		const newQuantity = quantity - 1;
		if (newQuantity <= 0) {
			toast.error('Cannot choose negative number of rental days !!');
		} else {
			dispatch(addCarsToCart(id, newQuantity));
		}
	};

	const removeCarsCart = (id) => {
		dispatch(removeCarsFromCart(id));
	};

	return (
		<>
			{favoriteCartItems.length === 0 ? (
				<div className="w-screen flex items-center">
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
									<h1 className="font-semibold text-2xl">Car favorite cart</h1>
									<h2 className="font-semibold text-2xl">3 Items</h2>
								</div>
								<div className="flex mt-10 mb-5">
									<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
										Car Details
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Day rental
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Rent per day
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Start Day End Day
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Unit Total
									</h3>
									<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
										Total
									</h3>
								</div>

								{favoriteCartItems &&
									favoriteCartItems.map((item) => (
										<FavoriteItemCard
											item={item}
											removeCarsCart={removeCarsCart}
											increaseQuantity={increaseQuantity}
											decreaseQuantity={decreaseQuantity}
										/>
									))}
								<div className="flex font-semibold text-xl mt-10 justify-center">
									<p>
										Total: 123 <PriceCheckIcon />
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>

		// <div>
		// 	<>
		// 		{favoriteCartItems.length === 0 ? (
		// 			<h1>Chua co </h1>
		// 		) : (
		// 			<div className="cartPage">
		// 				<div className="cartHeader"></div>

		// 				{favoriteCartItems &&
		// 					favoriteCartItems.map((item) => (
		// 						<div className="cartContainer" key={item.car}>
		// 							<FavoriteItemCard
		// 								item={item}
		// 								removeCarsCart={removeCarsCart}
		// 							/>
		// 							<div className="cartInput">
		// 								<button
		// 									onClick={() => decreaseQuantity(item.car, item.quantity)}
		// 								>
		// 									-
		// 								</button>
		// 								<input type="number" value={item.quantity} readOnly />
		// 								<button
		// 									onClick={() =>
		// 										increaseQuantity(
		// 											item.car,
		// 											item.quantity,
		// 											item.available
		// 										)
		// 									}
		// 								>
		// 									+
		// 								</button>
		// 							</div>
		// 							<p className="cartSubtotal">
		// 								Total moi don hang: {`₹${item.rentPerDay * item.quantity}`}
		// 							</p>
		// 						</div>
		// 					))}

		// 				<div className="cartGrossProfit">
		// 					<div></div>
		// 					<div className="cartGrossProfitBox">
		// 						<p>Total ALl: </p>
		// 						<p>{`₹${favoriteCartItems.reduce(
		// 							(all, item) => all + item.quantity * item.rentPerDay,
		// 							0
		// 						)}`}</p>
		// 					</div>
		// 					<div></div>
		// 					<div className="checkOutBtn">
		// 						<button>Check Out</button>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		)}
		// 	</>
		// </div>
	);
};

export default FavoriteCart;
