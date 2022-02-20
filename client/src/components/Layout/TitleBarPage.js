import React from 'react';
import Helmet from 'react-helmet';

const TitleBarPage = ({ title }) => {
	return (
		<Helmet>
			<title>{title}</title>
		</Helmet>
	);
};

export default TitleBarPage;
