import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';

const Cart = () => {
	const [cartProduct, setCartProduct] = useState([]);

	const [values, setValues] = useState({
		clientToken: null,
		success: '',
		error: '',
		instance: '',
	});

	useEffect(() => {
		setCartProduct(loadCart());
		getToken();
	}, []);

	const loadCart = () => {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart')); //   console.log(localStorage.getItem('cart'))
		}
		return [];
	};

	const { clientToken, success, error, instance } = values;
	const getToken = async () => {
		try {
			const { data } = await axios.get(`/api/booking/generateTokenPayPal`);

			setValues({ ...values, clientToken: data.clientToken });
		} catch (error) {
			console.log(error);
		}
	};

	const makePayment = async (data) => {
		// return (fetch('http://localhost:5000/api/booking/paymentPayPal'),
		// {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// }).then((response) => {
		// 	response.json();
		// });
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
				amount: getAmount(),
			};
			makePayment(paymentData)
				.then((response) => {
					console.log('====================================');
					console.log(response);
					console.log('====================================');
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
	const getAmount = () => {
		let amount = 0;
		cartProduct.map((data, i) => {
			amount = amount + data.amount;
		});
		return amount;
	};

	return (
		<div className="cart">
			<div className="cart-item">
				{cartProduct.length > 0 &&
					cartProduct.map((data, i) => (
						<Product
							key={i}
							name={data.name}
							from="cart"
							amount={data.amount}
							img={data.img}
						/>
					))}

				{cartProduct.length == 0 && <h1>Cart is Empty</h1>}
			</div>
			<div>
				{clientToken && (
					<div>
						<DropIn
							options={{ authorization: clientToken }}
							onInstance={(instance) =>
								setValues({ ...values, instance: instance })
							}
						/>
						<button
							onClick={() => {
								onPurchase();
							}}
						>
							Buy
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
