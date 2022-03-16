import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addCarsToCart,
	removeCarsFromCart,
} from '../../redux/actions/favoriteCartActions';
import { FavoriteItemCard } from './FavoriteItemCard';

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
				<div class="flex justify-center my-6">
					<div class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
						<div class="flex-1">
							<table class="w-full text-sm lg:text-base" cellspacing="0">
								<thead>
									<tr class="h-12 uppercase">
										<th class="hidden md:table-cell"></th>
										<th class="text-left">Product</th>
										<th class="lg:text-right text-left pl-5 lg:pl-0">
											<span class="lg:hidden" title="Quantity">
												Qtd
											</span>
											<span class="hidden lg:inline">Day rental</span>
										</th>
										<th class="hidden text-right md:table-cell">Unit price</th>
										<th class="text-right">Total price</th>
									</tr>
								</thead>
								{favoriteCartItems &&
									favoriteCartItems.map((item) => (
										<FavoriteItemCard
											item={item}
											removeCarsCart={removeCarsCart}
										/>
									))}
							</table>
							<hr class="pb-6 mt-6" />
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
