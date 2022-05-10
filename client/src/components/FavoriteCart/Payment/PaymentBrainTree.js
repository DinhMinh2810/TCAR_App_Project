import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	clearErrors,
	createBooking,
} from '../../../redux/actions/bookingAction';

const PaymentBrainTree = () => {
	const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));
	const { receivingCarTo, bookingCar } = useSelector(
		(state) => state.favoriteCart
	);
	const { user } = useSelector((state) => state.auth);
	const { error } = useSelector((state) => state.newBooking);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const book = {
		receivingCarTo,
		carId: bookingInfo.carId,
		bookCars: bookingCar,
		itemsPrice: bookingInfo.subtotal,
		shuttleFee: bookingInfo.shuttleFee,
		priceForDriver: bookingInfo.priceForDriver,
		deposits: bookingInfo.deposits,
		totalPrice: bookingInfo.totalPrice,
		methodPaid: 'BrainTree',
	};

	const [values, setValues] = useState({
		clientToken: null,
		instance: '',
	});

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		getTokenBrainTree();
	}, [error]);

	const { clientToken, instance } = values;
	const getTokenBrainTree = async () => {
		try {
			const { data } = await axios.get(`/api/booking/generateTokenBrainTree`);

			setValues({ ...values, clientToken: data.clientToken });
		} catch (error) {
			toast.error(error);
		}
	};

	const makePayment = async (data) => {
		try {
			const config = { headers: { 'Content-Type': 'application/json' } };
			const res = await axios.post(
				'/api/booking/paymentBrainTree',
				data,
				config
			);
			return res.data.result;
		} catch (error) {
			toast.error(error);
		}
	};

	const onPurchase = () => {
		instance.requestPaymentMethod().then((data) => {
			let nonce = data.nonce;

			let paymentData = {
				payment_method_nonce: nonce,
				amount: bookingInfo.deposits,
				id: user._id,
				email: user.email,
				firstName: user.name,
			};
			makePayment(paymentData)
				.then((response) => {
					if (response.err) {
						setValues({ ...values, error: response.err });
						toast.error(response.message);
					} else {
						if (response.success === true) {
							book.paymentInfo = {
								id: response.transaction.globalId,
								status: 'succeeded',
							};
							setValues({ ...values, success: response.success });
							dispatch(createBooking(book));
						}
						navigate('/paymentSuccess');
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
						Payment total - $ {bookingInfo && bookingInfo.deposits}
					</button>
				</div>
			)}
		</div>
	);
};

export default PaymentBrainTree;
