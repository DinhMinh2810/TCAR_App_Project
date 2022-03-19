import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './Payment.css';
import TitleBarPage from './../../Layout/TitleBarPage';
import { useNavigate } from 'react-router-dom';
import {
	clearErrors,
	createBooking,
} from '../../../redux/actions/bookingAction';

const PaymentStripe = () => {
	const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));

	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const payBtn = useRef(null);

	const { receivingCarTo, favoriteCartItems } = useSelector(
		(state) => state.favoriteCart
	);
	const { user } = useSelector((state) => state.auth);
	const { error } = useSelector((state) => state.newBooking);

	const paymentData = {
		amount: Math.round(bookingInfo.totalPrice),
	};

	const book = {
		receivingCarTo,
		bookCars: favoriteCartItems,
		itemsPrice: bookingInfo.subtotal,
		shuttleFee: bookingInfo.shuttleFee,
		priceForDriver: bookingInfo.priceForDriver,
		deposits: bookingInfo.deposits,
		totalPrice: bookingInfo.totalPrice,
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

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
							city: receivingCarTo.location,
						},
					},
				},
			});

			if (result.error) {
				payBtn.current.disabled = false;

				toast.error(result.error.message);
			} else {
				if (result.paymentIntent.status === 'succeeded') {
					book.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};
					dispatch(createBooking(book));
					toast.success('Payment success !!');
					navigate('/paymentSuccess');
				} else {
					toast.error('There is some issue while processing payment !!');
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-eightVH mt-10">
			<div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
				<h3 className="text-2xl font-bold text-center">Payment with stripe</h3>
				<ToastContainer className="toastify text-xs" />
				<TitleBarPage title="Payment with stripe" />
				<form onSubmit={(e) => submitHandler(e)}>
					<div className="mt-4">
						<div>
							<label className="block" htmlFor="text">
								Number Card
							</label>
							<CardNumberElement className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								Date Card Expiry
							</label>
							<CardExpiryElement className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="email">
								CVC Card
							</label>
							<CardCvcElement className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>

						<div className="flex">
							<input
								type="submit"
								value={`Payment total - $ ${
									bookingInfo && bookingInfo.totalPrice
								}`}
								ref={payBtn}
								className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentStripe;
