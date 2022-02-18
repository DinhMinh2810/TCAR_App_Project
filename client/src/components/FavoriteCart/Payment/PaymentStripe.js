import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';
import './Payment.css';

const PaymentStripe = () => {
	const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));

	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const payBtn = useRef(null);

	const { receivingCarTo, favoriteCartItems } = useSelector(
		(state) => state.favoriteCart
	);
	const { user } = useSelector((state) => state.auth);

	const paymentData = {
		amount: Math.round(bookingInfo.totalPrice * 100),
	};

	const book = {
		receivingCarTo,
		orderItems: favoriteCartItems,
		itemsPrice: bookingInfo.subtotal,
		taxPrice: bookingInfo.tax,
		shippingPrice: bookingInfo.shippingCharges,
		totalPrice: bookingInfo.totalPrice,
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		payBtn.current.disabled = true;

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/booking/paymentStripe',
				paymentData,
				config
			);

			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: receivingCarTo.address,
							city: receivingCarTo.city,
							postal_code: receivingCarTo.pinCode,
							country: receivingCarTo.country,
						},
					},
				},
			});

			if (result.error) {
				payBtn.current.disabled = false;

				console.log(result.error.message);
			} else {
				if (result.paymentIntent.status === 'succeeded') {
					book.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};

					console.log('/success');
				} else {
					console.log("There's some issue while processing payment ");
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			console.log(error.response.data.message);
		}
	};

	return (
		<Fragment>
			<div className="paymentContainer">
				<form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
					<h1>Card Info</h1>
					<div>
						<CardNumberElement className="paymentInput" />
					</div>
					<div>
						<CardExpiryElement className="paymentInput" />
					</div>
					<div>
						<CardCvcElement className="paymentInput" />
					</div>

					<input
						type="submit"
						value={`Pay - ₹${bookingInfo && bookingInfo.totalPrice}`}
						ref={payBtn}
						className="paymentFormBtn"
					/>
				</form>
			</div>
		</Fragment>
	);
};

export default PaymentStripe;
