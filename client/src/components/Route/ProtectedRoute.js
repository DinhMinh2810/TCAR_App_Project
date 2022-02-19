import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Check authentication

const ProtectedRoute = ({ isAdmin, isStaff, isDriver, isUser, children }) => {
	const { loading, isLoggedIn, user } = useSelector((state) => state.auth);

	return (
		<>
			{loading === false &&
				(() => {
					if (isLoggedIn === false) {
						return <Navigate replace to="/login" />;
					} else if (isAdmin === true && user.role !== 'Admin') {
						return <Navigate replace to="/login" />;
					} else if (isStaff === true && user.role !== 'Staff') {
						return <Navigate replace to="/login" />;
					} else if (isDriver === true && user.role !== 'Driver') {
						return <Navigate replace to="/login" />;
					} else if (isUser === true && user.role !== 'User') {
						return <Navigate replace to="/login" />;
					} else {
						return children;
					}
				})()}
		</>
	);
};

export default ProtectedRoute;
