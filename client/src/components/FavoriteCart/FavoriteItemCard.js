import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const FavoriteItemCard = ({ item, removeCarsCart }) => {
	const [quantity, setQuantity] = React.useState(0);

	React.useEffect(() => {
		getDays(item.startDay, item.endDay);
	}, [item.startDay, item.endDay]);

	function getDays(start, last) {
		const date1 = new Date(start);
		const date2 = new Date(last);

		const oneDay = 24 * 60 * 60 * 1000;

		const diffTime = date2.getTime() - date1.getTime();

		const diffDays = Math.round(diffTime / oneDay);

		return setQuantity(diffDays);
	}
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
						Remove this car
					</p>
				</div>
			</div>
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay} / day
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{moment(item.startDay).format('LLL')}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				{moment(item.endDay).format('LLL')}
			</span>
			<span className="text-center w-1/5 font-semibold text-sm">
				$ {item.rentPerDay * quantity} / {quantity} days rental
			</span>
			<Link
				to={`/carProduct/${item.car}`}
				className="text-center w-1/5 font-semibold text-sm"
			>
				👀
			</Link>
		</div>
	);
};
