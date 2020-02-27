import React, { Fragment } from 'react';
import SpinnerGif from './assets/spinner.gif';

const Spinner = () => {
	return (
		<Fragment>
			<img src={SpinnerGif} alt="spinner" className="Spinner" />
		</Fragment>
	);
};

export default Spinner;
