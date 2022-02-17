import axios from 'axios';

// Add card to favorite Cart
export const addCarsToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/cars/getDetailCar/${id}`);

	dispatch({
		type: 'ADD_TO_CART',
		payload: {
			car: data.car._id,
			name: data.car.name,
			rentPerDay: data.car.rentPerDay,
			image: data.car.images[0].url,
			available: data.car.available,
			quantity,
		},
	});

	localStorage.setItem(
		'favoriteCartItems',
		JSON.stringify(getState().favoriteCart.favoriteCartItems)
	);
};

// REMOVE FROM CART
export const removeCarsFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: 'REMOVE_CAR_CART',
		payload: id,
	});

	localStorage.setItem(
		'favoriteCartItems',
		JSON.stringify(getState().favoriteCart.favoriteCartItems)
	);
};
