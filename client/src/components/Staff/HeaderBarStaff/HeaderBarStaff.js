import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/authAction';
import { Link } from 'react-router-dom';
import '../../Admin/HeaderBarAdmin/headerBarAdmin.css';
import { TreeItem, TreeView } from '@mui/lab';

const HeaderBarStaff = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const logoutSubmit = async () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className="header_sideBar">
			<Link to="">
				<img className="header_sideBar_img" src={user?.avatar?.url} alt="" />
			</Link>
			<Link to="">
				<TreeView>
					<TreeItem nodeId="1" label={user?.name}>
						<Link to="/admin/products">
							<TreeItem nodeId="2" label="My Profile" />
						</Link>

						<Link to="/admin/product">
							<TreeItem nodeId="3" label="Change password" />
						</Link>
					</TreeItem>
				</TreeView>
			</Link>
			<Link to="/admin/dashboard">
				<p className="header_sideBar_text">Dashboard</p>
			</Link>
			<Link to="/admin/manager/accStaff">
				<p className="header_sideBar_text">Manager account driver</p>
			</Link>
			<Link to="/manager/allBooking">
				<p className="header_sideBar_text">Manager booking</p>
			</Link>
			<Link to="/staff/assignCar">
				<p className="header_sideBar_text">Assign car</p>
			</Link>
			<Link to="/admin/reviews">
				<p className="header_sideBar_text">Reviews</p>
			</Link>

			<div className="text-center bottom-0 w-full">
				<button
					className="py-2 text-sm text-gray-700 header_sideBar_btn"
					onClick={logoutSubmit}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default HeaderBarStaff;
