import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';
import { ToastContainer } from 'react-toastify';
import ChatProvider from './components/Context/ChatProvider';

ReactDOM.render(
	<Provider store={store}>
		<ChatProvider>
			<ToastContainer className="toastify text-xs" />
			<App />
		</ChatProvider>
	</Provider>,
	document.getElementById('root')
);
