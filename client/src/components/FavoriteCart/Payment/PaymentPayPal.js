import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';

const PaymentPayPal = () => {
	const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));
	const { receivingCarTo, favoriteCartItems } = useSelector(
		(state) => state.favoriteCart
	);
	const { user } = useSelector((state) => state.auth);

	const [values, setValues] = useState({
		clientToken: null,
		instance: '',
	});

	useEffect(() => {
		getTokenPayPal();
	}, []);

	const { clientToken, instance } = values;
	const getTokenPayPal = async () => {
		try {
			const { data } = await axios.get(`/api/booking/generateTokenPayPal`);

			setValues({ ...values, clientToken: data.clientToken });
		} catch (error) {
			console.log(error);
		}
	};

	const makePayment = async (data) => {
		try {
			const config = { headers: { 'Content-Type': 'application/json' } };
			const res = await axios.post('/api/booking/paymentPayPal', data, config);
			return res.data.result;
		} catch (error) {
			console.log(error);
		}
	};

	const onPurchase = () => {
		instance.requestPaymentMethod().then((data) => {
			let nonce = data.nonce;

			let paymentData = {
				payment_method_nonce: nonce,
				amount: bookingInfo.totalPrice,
				id: user._id,
				email: user.email,
				firstName: user.name,
			};
			makePayment(paymentData)
				.then((response) => {
					if (response.err) {
						setValues({ ...values, error: response.err });
					} else {
						setValues({ ...values, success: response.success });
					}
				})
				.catch((err) => {
					setValues({ ...values, error: err, success: '' });
				});
		});
	};

	return (
		<div className="px-20 py-10">
			{clientToken && (
				<div className="flex flex-column">
					<DropIn
						options={{ authorization: clientToken }}
						onInstance={(instance) =>
							setValues({ ...values, instance: instance })
						}
					/>
					<button
						className="px-4 py-3 border border-black rounded text-white bg-blue-600 hover:bg-blue-900 mt-2"
						onClick={() => {
							onPurchase();
						}}
					>
						Buy
					</button>
				</div>
			)}
		</div>
	);
};

export default PaymentPayPal;
