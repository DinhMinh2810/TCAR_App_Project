import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/authAction';
import { Link } from 'react-router-dom';
import './headerBarAdmin.css';
import { TreeItem, TreeView } from '@mui/lab';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ChatIcon from '@mui/icons-material/Chat';
import { toast } from 'react-toastify';
import logo1 from '../../../assets/images/logo1.png';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const HeaderBarAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const logoutSubmit = async () => {
		dispatch(logout());
		toast.success('Logout successfully !!');
		navigate('/');
	};

	return (
		<div className="header_sideBar">
			<Link to="">
				<img className="header_sideBar_img" src={logo1} alt="" />
			</Link>
			<Link to="">
				<p className="header_sideBar_text">
					<TreeView
						defaultCollapseIcon={<InsertEmoticonIcon />}
						defaultExpandIcon={<InsertEmoticonIcon />}
					>
						<TreeItem nodeId="1" label={user?.name}>
							<Link to="/admin/profile">
								<TreeItem nodeId="2" label="My Profile" icon={<PersonIcon />} />
							</Link>
							<Link to="/admin/editProfile">
								<TreeItem nodeId="3" label="Edit profile" icon={<EditIcon />} />
							</Link>
							<Link to="/admin/changePassword">
								<TreeItem
									nodeId="3"
									label="Change password"
									icon={<EditIcon />}
								/>
							</Link>
						</TreeItem>
					</TreeView>
				</p>
			</Link>
			<Link to="/admin/dashboard">
				<p className="header_sideBar_text">
					<DashboardIcon />
					Dashboard
				</p>
			</Link>
			<Link to="/admin/manager/allAccount">
				<p className="header_sideBar_text">
					<ManageAccountsIcon />
					Manager all account
				</p>
			</Link>
			<Link to="/admin/manager/accStaff">
				<p className="header_sideBar_text">
					<ManageAccountsIcon />
					Manager account staff
				</p>
			</Link>
			<Link to="/admin/manager/allCar">
				<p className="header_sideBar_text">
					<CarRentalIcon />
					Manager car
				</p>
			</Link>
			<Link to="/admin/reviews">
				<p className="header_sideBar_text">
					<ChatIcon />
					Message
				</p>
			</Link>

			<div className="text-center bottom-0 w-full">
				<button
					className="py-2 text-sm header_sideBar_btn text-white bg-blue-500 hover:bg-blue-400 rounded-full"
					onClick={logoutSubmit}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default HeaderBarAdmin;
