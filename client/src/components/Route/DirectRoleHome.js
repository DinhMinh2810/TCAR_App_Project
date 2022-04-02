import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Check authentication

const DirectRoleHome = ({ children }) => {
	const { loading, user } = useSelector((state) => state.auth);

	return (
		<>
			{loading === false &&
				(() => {
					if (user?.role === 'Admin') {
						return <Navigate replace to="/admin/dashboard" />;
					}
					if (user?.role === 'Staff') {
						return <Navigate replace to="/manager/allBooking" />;
					} else {
						return children;
					}
				})()}
		</>
	);
};

export default DirectRoleHome;
