import React from 'react';
import { Rating } from '@mui/material';
import moment from 'moment';

const ReviewCar = ({ review, menu, setMenu }) => {
	const options = {
		value: review.rating,
		readOnly: true,
		precision: 0.5,
	};
	return (
		<div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
			<div className="flex flex-col md:flex-row justify-between w-full items-center">
				<div className="flex flex-row justify-between items-start items-center">
					<div className="flex justify-start items-center flex-row space-x-2.5">
						<div>
							<img
								src={review.avatar}
								alt="girl-avatar"
								className="w-14 h-14 rounded-[50%]"
							/>
						</div>
						<div className="flex flex-col justify-start items-start space-y-2">
							<p className="text-base font-medium leading-none text-gray-800">
								{review.name}
							</p>
							<p className="text-sm leading-none text-gray-600">
								{moment(review.createdAt).format('LLL')}
							</p>
						</div>
					</div>
					<button onClick={() => setMenu(!menu)} className="ml-4 md:hidden">
						<svg
							className={'transform ' + (menu ? 'rotate-180' : 'rotate-0')}
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 12.5L10 7.5L5 12.5"
								stroke="#1F2937"
								strokeWidth="1.25"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div className="cursor-pointer mt-2 md:mt-0">
					<Rating {...options} />
				</div>
			</div>
			<div className={'md:block ' + (menu ? 'block' : 'hidden')}>
				<p className="mt-3 text-lg leading-normal text-gray-700 w-full ">
					Driver quality: {review.driver}
				</p>
			</div>
			<div className={'md:block ' + (menu ? 'block' : 'hidden')}>
				<p className="mt-3 text-base leading-normal text-gray-600 w-full ">
					{review.comment}
				</p>
			</div>
		</div>
	);
};

export default ReviewCar;
