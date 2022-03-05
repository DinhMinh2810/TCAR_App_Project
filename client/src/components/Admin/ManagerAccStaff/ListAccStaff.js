import React, { useEffect, useState } from 'react';
import TitleBarPage from '../../Layout/TitleBarPage';
import HeaderBarAdmin from '../HeaderBarAdmin/HeaderBarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccStaff } from '../../../redux/actions/adminAction';
import axios from 'axios';

const ListAccStaff = () => {
	const dispatch = useDispatch();
	const [count, setCount] = useState({});

	const { loading, users } = useSelector((state) => state.admin);

	useEffect(() => {
		// dispatch(getAllAccStaff());
		get();
	}, [dispatch]);

	const get = async (state) => {
		const res = await axios.get('/api/admin/getAccountStaff');
		console.log('====================================');
		console.log(res.data);
		console.log('====================================');
		setCount(res.data);
	};

	return (
		<div className="dashboard">
			<HeaderBarAdmin />
			{/* <h2 className="text-center pb-3">Manager account staff</h2> */}
			<TitleBarPage title="Dashboard Admin" />
			<>
				<div className="users">
					{count.map((user) => (
						<>
							<div className="user">{user.name}</div>
						</>
					))}
				</div>
			</>
		</div>
	);
};

export default ListAccStaff;
