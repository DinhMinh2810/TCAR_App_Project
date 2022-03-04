import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import './dashboard.css';

const Dashboard = () => {
	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			<div className="dashboardContainer">
				<h1>Dashboard</h1>

				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br />
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/products">
							<p>Product</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
						</Link>
					</div>
				</div>
				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br />
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/products">
							<p>Product</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
						</Link>
					</div>
				</div>
				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br />
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/products">
							<p>Product</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
						</Link>
					</div>
				</div>
				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br />
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/products">
							<p>Product</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
