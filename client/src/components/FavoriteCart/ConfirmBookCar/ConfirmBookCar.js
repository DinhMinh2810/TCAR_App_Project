import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ConfirmBookCar = () => {
	const navigate = useNavigate();
	const { favoriteCartItems, receivingCarTo } = useSelector(
		(state) => state.favoriteCart
	);
	const { user } = useSelector((state) => state.auth);

	const subtotal = favoriteCartItems.reduce(
		(acc, item) => acc + item.quantity * item.rentPerDay,
		0
	);

	const shippingCharges = subtotal > 1000 ? 0 : 200;

	const tax = subtotal * 0.18;

	const totalPrice = subtotal + tax + shippingCharges;

	const address = `${receivingCarTo.address}, ${receivingCarTo.pinCode}`;

	const paymentStripe = () => {
		const data = {
			subtotal,
			shippingCharges,
			tax,
			totalPrice,
		};

		sessionStorage.setItem('bookingInfo', JSON.stringify(data));

		navigate('/process/payment');
	};
	return (
		<>
			<div className="confirmOrderPage">
				<div>
					<div className="confirmshippingArea">
						<h2>Shipping Info</h2>
						<div className="confirmshippingAreaBox">
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{receivingCarTo.phoneNo}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>
					<div className="confirmCartItems">
						<h2>Your Cart Items:</h2>
						<div className="confirmCartItemsContainer">
							{favoriteCartItems &&
								favoriteCartItems.map((item) => (
									<div key={item.car}>
										<Link to={`/product/${item.car}`}>{item.name}</Link>{' '}
										<span>
											{item.quantity} X ₹{item.rentPerDay} ={' '}
											<b>₹{item.rentPerDay * item.quantity}</b>
										</span>
									</div>
								))}
						</div>
					</div>
				</div>

				<div>
					<div className="orderSummary">
						<h2>Order Summery</h2>
						<div>
							<div>
								<p>Subtotal:</p>
								<span>₹{subtotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>₹{shippingCharges}</span>
							</div>
							<div>
								<p>GST:</p>
								<span>₹{tax}</span>
							</div>
						</div>

						<div className="orderSummaryTotal">
							<p>
								<b>Total:</b>
							</p>
							<span>₹{totalPrice}</span>
						</div>

						<button onClick={paymentStripe}>Payment with stripe</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmBookCar;
