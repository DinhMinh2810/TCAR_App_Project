import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const FavoriteItemCard = ({ item, removeCarsCart }) => {
	return (
		<div className="flex items-center text-neutral-500 hover:bg-gray-100 -mx-8 px-6 py-5">
			<div className="flex w-2/5">
				<div className="w-20">
					<img className="h-24" src={item.image} alt="" />
				</div>
				<div className="flex flex-col justify-between ml-4 flex-grow">
					<Link
						to={`/carProduct/${item.car}`}
						className="font-bold text-sm text-neutral-500"
					>
						{item.name}
					</Link>
					<span className="text-red-500 text-xs">
						{item.seatsCategory} seat category
					</span>
					<p
						className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
						onClick={() => removeCarsCart(item.car)}
					>
						Remove
					</p>
				</div>
			</div>
			<span className="text-center w-1/5 font-semibold text-sm">
				{item.quantity} days
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay} / day
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{moment(item.StartDay).format('LLL')}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{moment(item.EndDay).format('LLL')}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay * item.quantity}
			</span>
		</div>
	);
};
