const initialState = { favoriteCartItems: [], receivingCarTo: {} };

export const favoriteCartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const item = action.payload;
			const isItemExist = state.favoriteCartItems.find(
				(i) => i.car === item.car
			);

			if (isItemExist) {
				return {
					...state,
					favoriteCartItems: state.favoriteCartItems.map((i) =>
						i.car === isItemExist.car ? item : i
					),
				};
			} else {
				return {
					...state,
					favoriteCartItems: [...state.favoriteCartItems, item],
				};
			}

		case 'ADD_BOOK_CAR':
			return {
				...state,
				bookingCar: action.payload,
			};

		case 'REMOVE_CAR_CART':
		case 'REMOVE_BOOK_CAR_CART':
			return {
				...state,
				favoriteCartItems: state.favoriteCartItems.filter(
					(i) => i.car !== action.payload
				),
			};

		case 'RECEIVE_CAR_TO':
			return {
				...state,
				receivingCarTo: action.payload,
			};

		default:
			return state;
	}
};
