import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import UserContext from '../../context/user/UserContext';

const LeaderBoard = () => {
	const { allPlayers } = useContext(UserContext);

	// rendering all users into the DOM
	let playerList = allPlayers
		// sorting by date
		.sort((a, b) => {
			return a.time - b.time;
		})
		// creating JSX
		.map((player) => {
			return (
				<ListGroup.Item key={player.date + player.time}>
					<div className="userItem">
						<p>{player.name}</p>
						<div>
							<p>{player.time}sec</p>
							<p>{player.date}</p>
						</div>
					</div>
				</ListGroup.Item>
			);
		});

	if (allPlayers.length < 1) {
		return (
			<div className="LeaderBoard">
				<h1>LEADER BOARD</h1>
				<h3>Get rocking with your 1st game</h3>
			</div>
		);
	} else {
		return (
			<div className="LeaderBoard">
				<h1>LEADER BOARD</h1>
				<ListGroup>{playerList}</ListGroup>
			</div>
		);
	}
};

export default LeaderBoard;
