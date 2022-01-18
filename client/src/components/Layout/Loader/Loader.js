import { Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				width: '100px',
				height: '100px',
				margin: 'auto',
				display: 'block',
				color: '#f6544f',
			}}
		>
			<span>Loading...</span>
		</Spinner>
	);
};

export default Loading;
