import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './FavoriteItemCard.css';

export const FavoriteItemCard = ({
	item,
	removeCarsCart,
	increaseQuantity,
	decreaseQuantity,
}) => {
	function addDays(theDate, days) {
		return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
	}

	let newEndDate = addDays(new Date(item.startDay), item.quantity);

	let a = item.rentPerDay;
	console.log(a);
	return (
		// <div>
		// 	<div className="CartItemCard">
		// 		<h4>Product: {item.name}</h4>
		// 		<h4>startDay: {item.startDay}</h4>
		// 		<h4>startDay: {moment(newDate).format('LLL')}</h4>
		// 		<h4>Available: {item.available}</h4>
		// 		<h4>{`Price: ₹${item.rentPerDay}`}</h4>
		// 		<button onClick={() => removeCarsCart(item.car)}>Remove</button>
		// 	</div>
		// </div>
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
					<span className="font-bold text-sm">{item.name}</span>
					<span className="text-red-500 text-xs">
						{item.seatsCategory} seat category
					</span>
					<p
						className="font-semibold hover:text-red-500 text-gray-500 text-xs"
						onClick={() => removeCarsCart(item.car)}
					>
						Remove
					</p>
				</div>
			</div>
			<div className="flex justify-center w-1/5">
				<button
					className="font-semibold hover:text-red-500 text-gray-500 text-xs"
					onClick={() => decreaseQuantity(item.car, item.quantity)}
				>
					-
				</button>

				<input
					className="mx-2 border text-center w-8"
					type="number"
					value={item.quantity}
					readOnly
				/>
				<button
					className="font-semibold hover:text-red-500 text-gray-500 text-xs"
					onClick={() =>
						increaseQuantity(item.car, item.quantity, item.available)
					}
				>
					+
				</button>
			</div>
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{item.startDay}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{moment(newEndDate).format('LLL')}
			</span>

			{/* <span className="text-center w-1/5 font-semibold text-sm">{`$${item.rentPerDay.reduce(
				(all, item) => all + item.rentPerDay * item.quantity,
				0
			)}`}</span> */}
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay * item.quantity}
			</span>
		</div>
	);
};
