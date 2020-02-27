import React, { useContext } from 'react';
import NavButtons from './navButtons/NavButtons';
import Message from '../message/Message';
import PlayArea from './playArea/PlayArea';

import GameContext from '../../context/game/GameContext';
import UserContext from '../../context/user/UserContext';

const GameBoard = () => {
	const { gameState, error } = useContext(GameContext);
	const { currentWinner } = useContext(UserContext);

	// const MSG =

	return (
		<div className="GameBoard">
			<NavButtons />
			<Message type={gameState} currentWinner={currentWinner} error={error} />
			<PlayArea />
		</div>
	);
};

export default GameBoard;
