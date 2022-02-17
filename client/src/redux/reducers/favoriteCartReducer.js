const initialState = { favoriteCartItems: [], shippingInfo: {} };

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

		default:
			return state;
	}
};
