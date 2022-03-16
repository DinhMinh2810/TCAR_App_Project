import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './FavoriteItemCard.css';

export const FavoriteItemCard = ({ item, removeCarsCart }) => {
	function addDays(theDate, days) {
		return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
	}
	let newDate = addDays(new Date(item.startDay), 2);
	return (
		<div>
			<div className="CartItemCard">
				<h4>Product: {item.name}</h4>
				<h4>startDay: {item.startDay}</h4>
				<h4>startDay: {moment(newDate).format('LLL')}</h4>
				<h4>Available: {item.available}</h4>
				<h4>{`Price: ₹${item.rentPerDay}`}</h4>
				<button onClick={() => removeCarsCart(item.car)}>Remove</button>
			</div>
		</div>
	);
};
