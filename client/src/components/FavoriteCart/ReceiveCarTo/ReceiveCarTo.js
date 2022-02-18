import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Country, State } from 'country-state-city';
import { receiveCarTo } from '../../../redux/actions/favoriteCartActions';
import { useNavigate } from 'react-router-dom';

const ReceiveCarTo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { receivingCarTo } = useSelector((state) => state.favoriteCart);

	const [address, setAddress] = useState(receivingCarTo.address);
	const [city, setCity] = useState(receivingCarTo.city);
	const [state, setState] = useState(receivingCarTo.state);
	const [country, setCountry] = useState(receivingCarTo.country);
	const [pinCode, setPinCode] = useState(receivingCarTo.pinCode);
	const [phoneNo, setPhoneNo] = useState(receivingCarTo.phoneNo);

	const shippingSubmit = (e) => {
		e.preventDefault();
		dispatch(receiveCarTo({ address, city, state, country, pinCode, phoneNo }));
		navigate('/confirmBookCar');
	};
	return (
		<div>
			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<input
								type="text"
								placeholder="Address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div>
							<input
								type="text"
								placeholder="City"
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>

						<div>
							<input
								type="number"
								placeholder="Pin Code"
								required
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
							/>
						</div>

						<div>
							<input
								type="number"
								placeholder="Phone Number"
								required
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								size="10"
							/>
						</div>

						{/* <div>
							<select
								required
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div> */}

						{/* {country && (
							<div>
								<select
									required
									value={state}
									onChange={(e) => setState(e.target.value)}
								>
									<option value="">State</option>
									{State &&
										State.getStatesOfCountry(country).map((item) => (
											<option key={item.isoCode} value={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)} */}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							// disabled={state ? false : true}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ReceiveCarTo;
