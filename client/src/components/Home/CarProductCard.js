import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

const CarProductCard = ({ car }) => {
	return (
		<>
			<Link to={`/car/${car._id}`}>
				<h2>{car.name}</h2>
				<Rating defaultValue={car.ratings} readOnly />
				<h4>{car.seatsCategory}</h4>
				<h4>{car.available}</h4>
				<h4>{car.rentPerDay}</h4>
			</Link>
		</>
	);
};

export default CarProductCard;
