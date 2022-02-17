import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({});

let initialState = {
	favoriteCart: {
		favoriteCartItems: localStorage.getItem('favoriteCartItems')
			? JSON.parse(localStorage.getItem('favoriteCartItems'))
			: [],
	},
};

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
