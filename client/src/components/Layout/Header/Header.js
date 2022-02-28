import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './header.css';

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
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container className="login">
					<Navbar.Brand className="navbar-brand1" href="#home">
						React-Bootstrap
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#features">Features</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
							<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>

						{isLoggedIn ? (
							<>
								<img src={user.avatar} />
								<NavDropdown title={user.name} id="collasible-nav-dropdown">
									<NavDropdown.Item href="#">My Profile</NavDropdown.Item>
									<NavDropdown.Item href="#">My favorite car</NavDropdown.Item>
									<NavDropdown.Item href="#">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#" onClick={logoutSubmit}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<Nav>
								<Nav.Link href="/register">Register</Nav.Link>
								<Nav.Link eventKey={2} href="/login">
									Login
								</Nav.Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
