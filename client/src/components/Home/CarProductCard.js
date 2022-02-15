import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

const CarProductCard = ({ car }) => {
	const nameAssignDriver = car.assigns.map((a) => a.name);
	return (
		<>
			<Link to={`/car/${car._id}`}>
				<h2>{car.name}</h2>
				<Rating defaultValue={car.ratings} readOnly />
				<h4>{car.seatsCategory}</h4>
				<h4>{car.available}</h4>
				<h4>{car.rentPerDay}</h4>
				<h4>assign: {nameAssignDriver} </h4>
			</Link>
		</>
	);
};

export default CarProductCard;
