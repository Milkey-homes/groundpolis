import React from 'react';
import { Link } from 'react-router-dom';

import { t } from '../scripts/i18n';


const notFound = () => (
	<div className="_flat-box _center">
		<h1>Not found</h1>
		<p>{ t('notFoundDescription') }</p>
		<Link to="/" className="primary">{ t('returnHome') }</Link>
	</div>
);

export default React.memo(notFound);