import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
	const token = useSelector((state) => state.token);
	const dispatch = useDispatch();

	const logoutSubmit = () => {
		dispatch(logout(token));
	};

	return (
		<div className="header">
			<Container>
				<Row lg={3} md={3} sm={3} xs={3}>
					<Col>Header</Col>
				</Row>
			</Container>

			<button onClick={logoutSubmit}>Logout</button>
		</div>
	);
};

export default Header;
