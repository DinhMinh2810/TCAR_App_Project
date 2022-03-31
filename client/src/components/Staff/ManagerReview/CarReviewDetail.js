import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarStaff from '../HeaderBarStaff/HeaderBarStaff';
import {
	clearErrors,
	deleteReviews,
	getAllReviews,
} from '../../../redux/actions/carAction';
import Loader from '../../Layout/Loader/Loader';
import { Rating } from '@mui/material';
import moment from 'moment';

const CarReviewDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { loading, error, reviews } = useSelector((state) => state.carReviews);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.deleteReview
	);

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success('Delete review successfully !!');
			dispatch({ type: 'DELETE_REVIEW_RESET' });
		}

		dispatch(getAllReviews(id));
	}, [dispatch, id, error, deleteError, isDeleted]);

	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReviews(reviewId, id));
	};

	return (
		<div className="dashboard">
			<HeaderBarStaff />
			<TitleBarPage title="Manager car review details" />
			<div className="flex flex-col p-3">
				<div className="-mt-2 -my-3 overflow-x-auto">
					<div className="pt-2 pb-3 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<h2 className="text-center pb-3">Manager review details</h2>
							{loading ? (
								<Loader />
							) : (
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												User
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Comment
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Evaluate driver
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Rating car
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Action
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{reviews?.map((review) => (
											<tr key={review?._id}>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															<img
																className="h-10 w-10 rounded-full"
																src={review?.avatar}
																alt=""
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{review?.name}
															</div>
															<div className="text-sm text-gray-500">
																{moment(review?.createdAt).format('LLL')}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													<p className="break-words whitespace-pre-wrap">
														{review?.comment}
													</p>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{review?.driver}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													<Rating
														value={review?.rating}
														precision={0.5}
														readOnly
													/>
												</td>

												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-blue">
													<button
														className="border-1 p-2 rounded mr-2 text-white bg-red-500"
														onClick={() => deleteReviewHandler(review?._id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarReviewDetail;
