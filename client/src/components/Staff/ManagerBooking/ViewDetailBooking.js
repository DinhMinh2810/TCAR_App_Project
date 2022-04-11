import React, { useEffect } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarStaff from './../HeaderBarStaff/HeaderBarStaff';
import Loader from '../../Layout/Loader/Loader';
import moment from 'moment';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	clearErrors,
	getBookingDetails,
} from './../../../redux/actions/bookingAction';
import { useParams } from 'react-router-dom';

const ViewDetailBooking = () => {
	const { id } = useParams();
	const { book, error, loading } = useSelector((state) => state.bookingDetails);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(getBookingDetails(id));
	}, [dispatch, error, id]);

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Staff View Detail Booking" />
			<>
				{loading ? (
					<Loader />
				) : (
					<div className="p-10">
						<div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
							<div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
								<h1 className="ml-2 uppercase font-bold text-gray-500">
									Booking car details
								</h1>
								<p className="ml-2 font-normal text-gray-500">😂😂</p>
							</div>
							<div className="mt-2 flex justify-start bg-white p-2">
								<div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
									<p className="font-normal text-sm ml-1 text-gray-500">
										Check information booking detail !!
									</p>
								</div>
							</div>
							<div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
								{book?.bookCars &&
									book?.bookCars.map((item) => (
										<>
											<div
												key={item?._id}
												className="flex flex-row place-item?s-center p-2"
											>
												<img
													src={item?.image}
													className="w-10 h-10"
													alt="Product"
												/>
												<div className="flex flex-col ml-2">
													<p className="text-gray-500">
														Name car: {item?.name}
													</p>
													<p className=" text-gray-500">
														Name driver: {item?.nameDriver}
													</p>
													<p className="text-gray-500">
														Seat category: {item?.seatsCategory}
													</p>
													<p className="text-gray-500">
														Location: {item?.location} city
													</p>
												</div>
											</div>
											<div className="flex flex-col p-2">
												<p className="text-gray-500">
													Number date rental: {item?.quantity} days
												</p>
												<p className="text-gray-500">
													Start day: {moment(item?.startDay).format('LLL')}
												</p>
												<p className="text-gray-500">
													End day: {moment(item?.endDay).format('LLL')}
												</p>
											</div>
										</>
									))}

								<div className="flex flex-col flex-wrap p-2">
									{book?.bookingStatus === 'Processing' ? (
										<p>
											Booking status:
											<span className="text-red-500"> Processing</span>
										</p>
									) : book?.bookingStatus === 'isRunning' ? (
										<p>
											Booking status:
											<span className="text-cyan-600"> Is running</span>
										</p>
									) : (
										<p>
											Booking status:
											<span className="text-lime-600"> Done</span>
										</p>
									)}
									<p className="text-gray-500 ">
										Payment status:
										{book.paymentInfo && (
											<span className="text-lime-600">
												<span> </span>
												{book.paymentInfo.status === 'succeeded' && 'Succeeded'}
											</span>
										)}
									</p>
									<p className="text-gray-500">
										Method paid: {book.methodPaid}
									</p>
									<p className="text-gray-500">
										Paid at: {book && moment(book.paidAt).format('LLL')}
									</p>
								</div>
							</div>
							<div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
								<div className="flex mx-6 py-4 flex-row flex-wrap">
									<CarRepairIcon className="w-22 h-22 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" />
									<div className="text-sm mx-2 flex flex-col">
										<p className="text-xl">INFO RECEIVED CAR 🙎🏼‍♂️🙎🏼‍♂️</p>
										<p className="">
											Name:
											<span> </span>
											{book?.userBooking?.nameUser &&
												book?.userBooking?.nameUser}
										</p>
										<p className="">
											Email:
											<span> </span>
											{book?.userBooking?.email && book?.userBooking?.email}
										</p>
										<p className="">
											Citizen Identifications:
											<span> </span>
											{book?.receivingCarTo?.citizenIdentifications &&
												book?.receivingCarTo?.citizenIdentifications}
										</p>
										<p className="">
											Phone Number:
											<span> </span>
											{book?.receivingCarTo?.phoneNum &&
												book?.receivingCarTo?.phoneNum}
										</p>
										<p className="">
											Day receive car:
											<span> </span>
											{book?.receivingCarTo?.day &&
												moment(book?.receivingCarTo?.day).format('LLL')}
										</p>
										<p className="">
											Address:
											<span> </span>
											{book?.receivingCarTo?.address &&
												book?.receivingCarTo?.address}
											<span>, </span>
											{book?.receivingCarTo?.location &&
												book?.receivingCarTo?.location}
											<span> </span>
											city
										</p>
									</div>
								</div>

								<div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
									<PaidIcon className="w-22 h-22 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" />
									<div className="text-sm mx-2 flex flex-col">
										<p className="font-bold">Price</p>
										<p>Rent per day: $ {book.itemsPrice}</p>
										<p>ShuttleFee: $ {book.shuttleFee}</p>
										<p>Deposits: $ {book.deposits}</p>
										<p>Pay for driver: $ {book.priceForDriver}</p>
										<p>Total: $ {book.totalPrice}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default ViewDetailBooking;
