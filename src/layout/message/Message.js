import React from 'react';
import Card from 'react-bootstrap/Card';

const Message = (props) => {
	let ReturnMSG = null;
	switch (props.type) {
		case 'default':
			ReturnMSG = (
				<Card bg="light">
					<Card.Body text="dark">Select game mode and enter your name and click "PLAY" to start</Card.Body>
				</Card>
			);
			break;
		case 'game':
			ReturnMSG = (
				<Card bg="info">
					<Card.Body text="light">Good luck!</Card.Body>
				</Card>
			);
			break;
		case 'over':
			props.currentWinner === 'computer'
				? (ReturnMSG = (
						<Card bg="warning">
							<Card.Body text="dark">Better luck next time...{props.currentWinner} won</Card.Body>
						</Card>
					))
				: (ReturnMSG = (
						<Card bg="success">
							<Card.Body text="dark">Well done {props.currentWinner}!</Card.Body>
						</Card>
					));
			break;
		case 'error':
			ReturnMSG = (
				<Card bg="warning">
					<Card.Body text="light">{props.error}</Card.Body>
				</Card>
			);
			break;

		default:
			ReturnMSG = (
				<Card bg="light">
					<Card.Body text="dark">Select game mode and enter your name and click "PLAY" to start</Card.Body>
				</Card>
			);
	}
	return ReturnMSG;
};

export default Message;
