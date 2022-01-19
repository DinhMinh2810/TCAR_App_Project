import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const { user, isLoggedIn } = auth;
	console.log('====================================');
	console.log(auth);
	console.log('====================================');
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// console.log(user);

	const logoutSubmit = async () => {
		dispatch(logout());
		// try {
		// 	localStorage.removeItem('userLogin');
		// 	await axios.get('/api/logout');

		// 	window.location.href = '/';
		// } catch (err) {
		// 	window.location.href = '/';
		// }
		navigate('/');
	};

	return (
		<div className="header">
			<Container>
				<Row lg={3} md={3} sm={3} xs={3}>
					<Col>
						<h1>Header</h1>

						{isLoggedIn ? (
							<div>
								<Dropdown>
									<Dropdown.Toggle variant="success" id="dropdown-basic">
										{user.name}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
										<Dropdown.Item href="#/action-2">
											Another action
										</Dropdown.Item>

										<Button onClick={logoutSubmit}>Logout</Button>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						) : (
							<Link to="/login">Login In</Link>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Header;
