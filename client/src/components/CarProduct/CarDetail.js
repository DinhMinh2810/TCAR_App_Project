import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarDetails } from '../../redux/actions/carAction';
import { useParams } from 'react-router-dom';
import { addCarsToCart } from '../../redux/actions/favoriteCartActions';

const CarDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { car } = useSelector((state) => state.carProductDetails);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		dispatch(getCarDetails(id));
	}, [dispatch, id]);

	const increaseQuantity = () => {
		if (car.available <= quantity) {
			console.log('So luong xe co san it hon so luong dat ');
		} else {
			const increase = quantity + 1;
			setQuantity(increase);
		}
	};

	const decreaseQuantity = () => {
		if (quantity <= 1) {
			console.log('ko duoc la so am');
		} else {
			const decrease = quantity - 1;
			setQuantity(decrease);
		}
	};

	const addToCartHandler = () => {
		dispatch(addCarsToCart(id, quantity));
		console.log('Item Added To Cart');
	};
	return (
		<>
			<div>
				<div>
					<h4>name car: {car.name}</h4>
					<h4>available: {car.available}</h4>
					<h4>rent per day: {car.rentPerDay}</h4>
				</div>
				<div>
					<button onClick={decreaseQuantity}>-</button>
					<input readOnly type="number" value={quantity} />
					<button onClick={increaseQuantity}>+</button>
				</div>
				<div>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</div>
		</>
	);
};

export default CarDetail;
