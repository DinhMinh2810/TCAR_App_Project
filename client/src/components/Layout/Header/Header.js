import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const { user, isLoggedIn } = auth;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutSubmit = async () => {
		dispatch(logout());
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
										<Dropdown.Item href="#/action-1">
											Role: {user.role}
										</Dropdown.Item>

										<Button onClick={logoutSubmit}>Logout</Button>
									</Dropdown.Menu>
								</Dropdown>
								<>
									<img src={user.avatar} alt="img" width="100" height="100" />
								</>
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
