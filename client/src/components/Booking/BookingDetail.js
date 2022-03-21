import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors } from '../../redux/actions/bookingAction';
import { getBookingDetails } from './../../redux/actions/bookingAction';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Layout/Loader/Loader';
import moment from 'moment';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import InfoIcon from '@mui/icons-material/Info';
import PaidIcon from '@mui/icons-material/Paid';
const BookingDetail = () => {
	const { book, error, loading } = useSelector((state) => state.bookingDetails);
	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		dispatch(getBookingDetails(id));
	}, [dispatch, error, id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="p-10">
					<div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
						<div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
							<h1 className="ml-2 uppercase font-bold text-gray-500">
								departure
							</h1>
							<p className="ml-2 font-normal text-gray-500">Wednesday 18 Aug</p>
						</div>
						<div className="mt-2 flex justify-start bg-white p-2">
							<div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
								<svg
									viewBox="0 0 64 64"
									pointer-events="all"
									aria-hidden="true"
									class="etiIcon css-jbc4oa"
									role="presentation"
								>
									<path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path>
								</svg>
								<p className="font-normal text-sm ml-1 text-gray-500">
									Economy
								</p>
							</div>
						</div>
						<div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
							{book.bookCars &&
								book.bookCars.map((item) => (
									<>
										<div
											key={item.car}
											className="flex flex-row place-items-center p-2"
										>
											<img
												src={item.image}
												className="w-10 h-10"
												alt="Product"
											/>
											<div className="flex flex-col ml-2">
												<p className="text-xs text-gray-500 font-bold">
													Name car: {item.name}
												</p>
												<p className="text-xs text-gray-500">
													Name driver : {item.nameDriver}
												</p>
												<p className="text-xs text-gray-500">
													Name car: {item.seatsCategory}
												</p>
											</div>
										</div>
										<div className="flex flex-col p-2">
											<p className="font-bold">
												Number date rental: {item.quantity} days
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
								<p className="font-bold">
									Booking status: {book.bookingStatus}
								</p>
								<p className="text-gray-500">
									Payment status: {book.paymentInfo && book.paymentInfo.status}
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
											book?.receivingCarTo?.location}{' '}
										city
									</p>
								</div>
							</div>
							<div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
								<PaidIcon class="w-30 h-12 p-2 mx-2 self-center bg-green-800 rounded-full fill-current" />
								<div className="text-sm mx-2 flex flex-col">
									<p className="font-bold">Price</p>
									<p>Rent per day: $ {book.itemsPrice}</p>
									<p>ShuttleFee: $ {book.shuttleFee}</p>
									<p>Deposits: $ {book.deposits}</p>
									<p>Pay for driver: $ {book.priceForDriver}</p>
									<p>Total: $ {book.totalPrice}</p>
								</div>
								<div className="flex items-center">
									<button className="w-32 h-11 rounded flex border-solid border  mx-2 justify-center place-items-center">
										<Link to="/" className="bg-blue text-black">
											Review car
										</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookingDetail;
