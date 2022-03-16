import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addCarsToCart,
	removeCarsFromCart,
} from '../../redux/actions/favoriteCartActions';
import { FavoriteItemCard } from './FavouriteItemCard/FavoriteItemCard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const FavoriteCart = () => {
	const dispatch = useDispatch();
	const { favoriteCartItems } = useSelector((state) => state.favoriteCart);

	const increaseQuantity = (id, quantity, available) => {
		const newQuantity = quantity + 1;
		if (available <= quantity) {
			return;
		} else {
			dispatch(addCarsToCart(id, newQuantity));
		}
	};

	const decreaseQuantity = (id, quantity) => {
		const newQuantity = quantity - 1;
		if (quantity <= 1) {
			return;
		}
		dispatch(addCarsToCart(id, newQuantity));
	};

	const removeCarsCart = (id) => {
		dispatch(removeCarsFromCart(id));
	};

	return (
		<>
			{favoriteCartItems.length === 0 ? (
				<h1>Chua co </h1>
			) : (
				<div>
					<div className="container mx-auto mt-10">
						<div className="flex shadow-md my-10">
							<div className="w-full bg-white px-10 py-10">
								<div className="flex justify-between border-b pb-8">
									<h1 className="font-semibold text-2xl">Favorite card</h1>
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
								<div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
									<div className="flex w-2/5">
										<div className="w-20">
											<img
												className="h-24"
												src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
												alt=""
											/>
										</div>
										<div className="flex flex-col justify-between ml-4 flex-grow">
											<span className="font-bold text-sm">Iphone 6S</span>
											<span className="text-red-500 text-xs">Apple</span>
											<p className="font-semibold hover:text-red-500 text-gray-500 text-xs">
												Remove
											</p>
										</div>
									</div>
									<div className="flex justify-center w-1/5">
										<svg
											className="fill-current text-gray-600 w-3"
											viewBox="0 0 448 512"
										>
											<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
										</svg>

										<input
											className="mx-2 border text-center w-8"
											type="text"
											placeholder="1"
										/>

										<svg
											className="fill-current text-gray-600 w-3"
											viewBox="0 0 448 512"
										>
											<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
										</svg>
									</div>
									<span className="text-center w-1/5 font-semibold text-sm">
										$400.00
									</span>
									<span className="text-center w-1/5 font-semibold text-sm">
										$400.00
									</span>
									<span className="text-center w-1/5 font-semibold text-sm">
										$400.00
									</span>
									<span className="text-center w-1/5 font-semibold text-sm">
										$400.00
									</span>
								</div>
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
