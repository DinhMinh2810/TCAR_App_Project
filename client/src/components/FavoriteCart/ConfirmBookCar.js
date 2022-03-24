import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ConfirmBookCar = () => {
	const navigate = useNavigate();
	const { favoriteCartItems, receivingCarTo } = useSelector(
		(state) => state.favoriteCart
	);
	const { car } = useSelector((state) => state.carProductDetails);
	const { user } = useSelector((state) => state.auth);
	const [quantity, setQuantity] = useState(0);
	const subtotal = favoriteCartItems.reduce(
		(acc, item) => acc + quantity * item.rentPerDay,
		0
	);

	const shuttleFee = subtotal * 0.2;
	const deposits = (subtotal + shuttleFee) / 2;
	const totalPrice = subtotal + shuttleFee;

	const priceForDriver = totalPrice - deposits;

	function getDays(start, last) {
		const date1 = new Date(start);
		const date2 = new Date(last);

		const oneDay = 24 * 60 * 60 * 1000;

		const diffTime = date2.getTime() - date1.getTime();

		const diffDays = Math.round(diffTime / oneDay);

		return setQuantity(diffDays);
	}

	React.useEffect(() => {
		getDays(car.startDay, car.endDay);
	}, [car.startDay, car.endDay]);

	const paymentStripe = () => {
		const data = {
			subtotal,
			shuttleFee,
			deposits,
			priceForDriver,
			totalPrice,
		};
		sessionStorage.setItem('bookingInfo', JSON.stringify(data));
		navigate('/paymentWithStripe');
	};

	// const paymentPayPal = () => {
	// 	const data = {
	// 		subtotal,
	// 		shippingCharges,
	// 		tax,
	// 		totalPrice,
	// 	};

	// 	sessionStorage.setItem('bookingInfo', JSON.stringify(data));

	// 	navigate('/paymentWithPayPal');
	// };
	return (
		<>
			<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
				<div className="flex justify-start item-start space-y-2 flex-col ">
					<h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
						Booking car
					</h1>
					<p className="text-base font-medium leading-6 text-gray-600">
						{moment(Date.now()).format('LLL')}
					</p>
				</div>
				<div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
					<div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
						<div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
							<p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
								Car book cart
							</p>
							{car && (
								<>
									<div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
										<div className="pb-4 md:pb-8 w-full md:w-40">
											<img
												className="w-full hidden md:block"
												src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
												alt="dress"
											/>
											<img
												className="w-full md:hidden"
												src="https://i.ibb.co/L039qbN/Rectangle-10.png"
												alt="dress"
											/>
										</div>
										<div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
											<div className="w-full flex flex-col justify-start items-start space-y-8">
												<h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
													{car?.name}
												</h3>
												<div className="flex justify-start items-start flex-col space-y-2">
													{/* {car &&
														car.assigns.map((x) => (
															<p className="text-sm leading-none text-gray-800">
																<span className="text-gray-600">
																	Name driver: {x.name}
																</span>
															</p>
														))} */}
													<p className="text-sm leading-none text-gray-800">
														<span className="text-gray-600">
															Name driver: {car?.assigns?.name}
														</span>
													</p>
													<p className="text-sm leading-none text-gray-800">
														<span className="text-gray-600">
															{car?.seatsCategory} Seats category
														</span>
													</p>
													<p className="text-sm leading-none text-gray-800">
														<span className="text-gray-600">Start day: </span>
														{moment(car?.startDay).format('LLL')}
													</p>
													<p className="text-sm leading-none text-gray-800">
														<span className="text-gray-600">End day: </span>
														{moment(car?.endDay).format('LLL')}
													</p>
												</div>
											</div>
											<div className="flex justify-between space-x-8 items-start w-full">
												<p className="text-base xl:text-lg leading-6">
													$ {car?.rentPerDay} / day
												</p>
												<p className="text-base xl:text-lg leading-6 text-gray-800 mt-0">
													{quantity} days rental
												</p>
												<p className="text-base xl:text-lg font-semibold leading-6 text-gray-800 mt-0">
													$ {car?.rentPerDay * quantity}
												</p>
											</div>
										</div>
									</div>
								</>
							)}
							{/* {favoriteCartItems &&
								favoriteCartItems.map((item) => (
									<>
										<div
											key={item?.name}
											className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
										>
											<div className="pb-4 md:pb-8 w-full md:w-40">
												<img
													className="w-full hidden md:block"
													src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
													alt="dress"
												/>
												<img
													className="w-full md:hidden"
													src="https://i.ibb.co/L039qbN/Rectangle-10.png"
													alt="dress"
												/>
											</div>
											<div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
												<div className="w-full flex flex-col justify-start items-start space-y-8">
													<h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
														{item?.name}
													</h3>
													<div className="flex justify-start items-start flex-col space-y-2">
														<p className="text-sm leading-none text-gray-800">
															<span className="text-gray-600">
																Name driver: {item?.nameDriver}
															</span>
														</p>
														<p className="text-sm leading-none text-gray-800">
															<span className="text-gray-600">
																{item?.seatsCategory} Seats category
															</span>
														</p>
														<p className="text-sm leading-none text-gray-800">
															<span className="text-gray-600">Start day: </span>
															{moment(item?.startDay).format('LLL')}
														</p>
														<p className="text-sm leading-none text-gray-800">
															<span className="text-gray-600">End day: </span>
															{moment(item?.endDay).format('LLL')}
														</p>
													</div>
												</div>
												<div className="flex justify-between space-x-8 items-start w-full">
													<p className="text-base xl:text-lg leading-6">
														$ {item?.rentPerDay} / day
													</p>
													<p className="text-base xl:text-lg leading-6 text-gray-800 mt-0">
														{item?.quantity} days rental
													</p>
													<p className="text-base xl:text-lg font-semibold leading-6 text-gray-800 mt-0">
														$ {item?.rentPerDay * item?.quantity}
													</p>
												</div>
											</div>
										</div>
									</>
								))} */}
						</div>
						<div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
							<div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
								<h3 className="text-xl font-semibold leading-5 text-gray-800">
									Summary
								</h3>
								<div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
									<div className="flex justify-between  w-full">
										<p className="text-base leading-4 text-gray-800">
											Subtotal
										</p>
										<p className="text-base leading-4 text-gray-600">
											$ {subtotal}
										</p>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base leading-4 text-gray-800">
											Shuttle fee
										</p>
										<p className="text-base leading-4 text-gray-600">
											$ {shuttleFee}
										</p>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base leading-4 text-gray-800">Deposit</p>
										<p className="text-base leading-4 text-gray-600">
											$ {deposits}
										</p>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base leading-4 text-gray-800">
											Payment for driver after received car
										</p>
										<p className="text-base leading-4 text-gray-600">
											$ {priceForDriver}
										</p>
									</div>
								</div>
								<div className="flex justify-between items-center w-full">
									<p className="text-base font-semibold leading-4 text-gray-800">
										Total
									</p>
									<p className="text-base font-semibold leading-4 text-gray-600">
										$ {totalPrice}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
						<h3 className="text-xl font-semibold leading-5 text-gray-800">
							Confirm information
						</h3>
						<div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
							<div className="flex flex-col justify-start items-start flex-shrink-0">
								<div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
									<img
										src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
										alt="avatar"
									/>
									<div className=" flex justify-start items-start flex-col space-y-2">
										<p className="text-base font-semibold leading-4 text-left text-gray-800">
											{user?.name}
										</p>
										<p className="text-sm leading-5 text-gray-600">
											+{receivingCarTo?.phoneNum}
										</p>
									</div>
								</div>

								<div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
											stroke="#1F2937"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3 7L12 13L21 7"
											stroke="#1F2937"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<p className="cursor-pointer text-sm leading-5 text-gray-800">
										{user?.email}
									</p>
								</div>
							</div>
							<div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
								<div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
									<div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
										<p className="text-base font-semibold leading-4 md:text-left text-gray-800">
											Identifications &amp; Day Receive Car
										</p>
										<p className="w-48 lg:w-full xl:w-48 text-center  md:text-left text-sm leading-5 text-gray-600">
											{receivingCarTo?.citizenIdentifications}
										</p>
										<p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
											{moment(receivingCarTo?.day).format('LLL')}
										</p>
									</div>

									<div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
										<p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
											Receive Car Address
										</p>
										<p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
											{receivingCarTo?.address}, {receivingCarTo?.location} city
										</p>
									</div>
								</div>
								<div className="flex w-full justify-center items-center md:justify-start md:items-start">
									<button
										onClick={paymentStripe}
										className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
									>
										Payment booking with stripe
									</button>
								</div>
								<div className="flex w-full justify-center items-center md:justify-start md:items-start">
									<button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
										Payment booking with paypal
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmBookCar;