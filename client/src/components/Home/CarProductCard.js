import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CarProductCard = ({ car }) => {
	const options = {
		value: car.ratings,
		readOnly: true,
		precision: 0.5,
	};

	return (
		<Link
			to={`/car/${car?._id}`}
			key={car?.id}
			className="group relative text-neutral-700"
		>
			<div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
				<img
					src={car.images[0].url}
					alt=""
					className="w-full h-full object-center object-cover lg:w-full lg:h-full"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-blackBold font-bold">
						<span aria-hidden="true" className="absolute inset-0" />
						{car?.name}
					</h3>
					<p className="mt-1 text-sm flex items-center">
						<Rating {...options} />({car.numOfReviews} Reviews)
					</p>
					<p className="mt-1 text-sm text-gray-600 py-2">
						<LocationOnIcon />
						{car?.location} City
					</p>
				</div>
				<p className="text-sm font-medium text-gray-800">$ {car?.rentPerDay}</p>
			</div>
		</Link>
	);
};

export default CarProductCard;
