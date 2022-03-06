import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/authAction';
import { Link } from 'react-router-dom';
import './headerBarAdmin.css';
import { TreeItem, TreeView } from '@mui/lab';

const HeaderBarAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutSubmit = async () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className="header_sideBar">
			<Link className="header_sideBar_img" to="/">
				<p>ss</p>
				<img
					src="data:image/jpeg;base64,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"
					alt="Ecommerce"
				/>
			</Link>
			<Link to="/admin/dashboard">
				<p>Dashboard</p>
			</Link>
			<Link to="">
				<TreeView>
					<TreeItem nodeId="1" label="Products">
						<Link to="/admin/products">
							<TreeItem nodeId="2" label="All" />
						</Link>

						<Link to="/admin/product">
							<TreeItem nodeId="3" label="Create" />
						</Link>
					</TreeItem>
				</TreeView>
			</Link>
			<Link to="/admin/manager/allAccount">
				<p>Manager all account</p>
			</Link>
			<Link to="/admin/manager/accStaff">
				<p>Manager account staff</p>
			</Link>
			<Link to="/admin/reviews">
				<p>Reviews</p>
			</Link>

			<div class="text-center bottom-0 w-full">
				<button
					class="py-2 text-sm text-gray-700 header_sideBar_btn"
					onClick={logoutSubmit}
				>
					Logout
				</button>
			</div>
		</div>

	);
};

export default HeaderBarAdmin;
