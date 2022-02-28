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
						<Nav className="me-auto hide-on-mobile">
							<Nav.Link href="#features">Home</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
							<Nav.Link href="#pricing">Features</Nav.Link>
						</Nav>

						{isLoggedIn ? (
							<>
								<div className="header_res hide-on-pc">
									<img
										src={user?.avatar?.url}
										width="50"
										height="50"
										className="img-responsive"
									/>
									<span className="header_name">{user?.name}</span>
								</div>

								<div className="header_res hide-on-pc">
									<a href="#" className="header_name">
										Profile
									</a>
								</div>
								<div className="header_res hide-on-pc">
									<a className="header_name">Profile</a>
								</div>
								<div
									className="header_res logout hide-on-pc"
									onClick={logoutSubmit}
								>
									<a className="header_name">Logout</a>
								</div>

								<img
									src={user?.avatar?.url}
									width="50"
									height="50"
									className="img-responsive hide-on-mobile-tablet"
								/>
								<NavDropdown
									title={user?.name}
									id="collasible-nav-dropdown"
									className="hide-on-mobile-tablet"
								>
									<NavDropdown.Item href="#action/3.1">
										Profile
									</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">
										Profile
									</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={logoutSubmit}>
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
