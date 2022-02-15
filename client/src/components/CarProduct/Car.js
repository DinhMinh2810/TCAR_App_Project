import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars, clearErrors } from '../../redux/actions/carAction';
import { toast } from 'react-toastify';
import CarProductCard from '../Home/CarProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Slider } from '@mui/material';

const Car = () => {
	const dispatch = useDispatch();
	const { keyword } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [rentPerDay, setRentPerDay] = useState([0, 200000]);

	const { cars, error, carsCount, resultItemPage } = useSelector(
		(state) => state.carsProduct
	);

	useEffect(() => {
		if (error) {
			toast.warn(error);
			dispatch(clearErrors());
		}
		dispatch(getCars(keyword, currentPage, rentPerDay));
	}, [dispatch, keyword, currentPage, rentPerDay, error]);

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	const rentPerDayHandler = (event, newRentPerDay) => {
		setRentPerDay(newRentPerDay);
	};

	return (
		<div>
			<div>
				{cars && cars.map((car) => <CarProductCard key={car._id} car={car} />)}
			</div>
			<h1>Price</h1>
			<Slider
				value={rentPerDay}
				onChange={rentPerDayHandler}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				min={0}
				max={600000}
			/>
			<div>
				{resultItemPage < carsCount && (
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={resultItemPage}
						totalItemsCount={carsCount}
						onChange={setCurrentPageNo}
						nextPageText="Next"
						prevPageText="Prev"
						firstPageText="1st"
						lastPageText="Last"
						itemClass="page-item"
						linkClass="page-link"
						activeClass="pageItemActive"
						activeLinkClass="pageLinkActive"
					/>
				)}
			</div>
		</div>
	);
};

export default Car;
