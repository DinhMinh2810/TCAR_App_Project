import axios from 'axios';

// Add car to favorite Cart
export const addCarsToCart =
	(id, quantity, StartDay, EndDay) => async (dispatch, getState) => {
		const { data } = await axios.get(`/api/cars/getDetailCar/${id}`);

		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				car: data.car._id,
				name: data.car.name,
				nameDriver: data.car.assigns.name,
				rentPerDay: data.car.rentPerDay,
				image: data.car.images[0].url,
				seatsCategory: data.car.seatsCategory,
				available: data.car.available,
				startDay: data.car.startDay,
				endDay: data.car.endDay,
				location: data.car.location,
				quantity,
				StartDay,
				EndDay,
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

// booking car
export const bookingCar =
	(id, quantity, StartDay, EndDay) => async (dispatch, getState) => {
		const { data } = await axios.get(`/api/cars/getDetailCar/${id}`);

		dispatch({
			type: 'ADD_BOOK_CAR',
			payload: {
				car: data.car._id,
				name: data.car.name,
				nameDriver: data.car.assigns.name,
				rentPerDay: data.car.rentPerDay,
				image: data.car.images[0].url,
				seatsCategory: data.car.seatsCategory,
				available: data.car.available,
				startDay: data.car.startDay,
				endDay: data.car.endDay,
				location: data.car.location,
				quantity,
				StartDay,
				EndDay,
			},
		});
		localStorage.setItem(
			'bookingCarItems',
			JSON.stringify(getState().favoriteCart.bookingCarItems)
		);
	};

// save info received car
export const receiveCarTo = (data) => async (dispatch) => {
	dispatch({
		type: 'RECEIVE_CAR_TO',
		payload: data,
	});

	localStorage.setItem('receiveCarTo', JSON.stringify(data));
};
