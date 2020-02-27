import React from 'react';
import Button from 'react-bootstrap/Button';

const CustomButton = (props) => {
	let ReturnButton = null;
	switch (props.type) {
		case 'default':
			ReturnButton = (
				<Button variant="dark" size="lg" onClick={props.handleSubmit}>
					PLAY
				</Button>
			);
			break;
		// case 'game':
		// 	ReturnButton = (
		// 		<Button  variant="danger" size="lg" disabed onClick={props.handleSubmit}>
		// 			GAME ON
		// 		</Button>
		// 	);
		// 	break;
		case 'over':
			ReturnButton = (
				<Button variant="primary" size="lg" onClick={props.handleSubmit}>
					GO AGAIN!
				</Button>
			);
			break;

		default:
			ReturnButton = (
				<Button variant="dark" size="lg" onClick={props.handleSubmit}>
					PLAY
				</Button>
			);
	}
	return ReturnButton;
};

export default CustomButton;
