import React from 'react';

export const FavoriteItemCard = ({ item, removeCarsCart }) => {
	return (
		<div>
			<div className="CartItemCard">
				<h4>Product: {item.name}</h4>
				<h4>Image: {item.image}</h4>
				<h4>Available: {item.available}</h4>
				<h4>{`Price: ₹${item.rentPerDay}`}</h4>
				<button onClick={() => removeCarsCart(item.car)}>Remove</button>
			</div>
		</div>
	);
};
