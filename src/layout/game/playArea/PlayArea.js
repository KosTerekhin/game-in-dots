import React, { useContext, useEffect } from 'react';
import Random from 'random-item';
import GameItem from './GameItem';

import gameContext from '../../../context/game/GameContext';
import UserContext from '../../../context/user/UserContext';

const PlayArea = () => {
	const {
		gameState,
		increaseCount,
		gameEnded,
		randomArray,
		updateRandomArray,
		currentGame: { delay, field },
		count: { red, green }
	} = useContext(gameContext);

	const { postWinner, setStartTime } = useContext(UserContext);

	let indexArray = [];

	// RENDER GAME BOARD
	let items;
	let references;
	const setEmptyBoard = () => {
		let playArea = Math.pow(field, 2);

		// creating REF to children
		references = Array(playArea).fill(0).map(() => React.createRef());

		// creating all game items
		items = [ ...Array(playArea) ].map((_, index) => {
			// push all indexes for the game start
			indexArray.push(index);

			// create game element
			return <GameItem key={index} field={field} increaseCount={increaseCount} forwardRef={references[index]} />;
		});
	};
	delay && setEmptyBoard();

	// MAIN GAME FUNCTION
	const startGame = (references) => {
		// ADDING BLUE ITEM
		// creating random number from filtered array
		randomArray.forEach((random) => {
			indexArray.splice(indexArray.indexOf(random), 1);
		});

		if (indexArray.length > 0) {
			let randomElement = Random(indexArray);
			let itemClass = references[randomElement].current.classList;
			itemClass.add('blue');

			// update array for next iteration
			updateRandomArray(randomElement);

			// HANDLING TIMEOUT or ADDING RED COLOR
			setTimeout(() => {
				if (!itemClass.contains('green') && itemClass.contains('blue')) {
					itemClass.remove('blue');
					itemClass.add('red');
					increaseCount('red');
				}
			}, delay);
		} else return;
	};

	useEffect(
		() => {
			// START THE GAME
			if (gameState === 'game') {
				startGame(references);

				// saving start time
				if (red === 0 && green === 0) {
					setStartTime(Date.now());
				}
			}

			// CONDITION TO FINISH THE GAME
			if (references) {
				const condition = references.length / 2;
				if (red > condition || green > condition) {
					// updating DOM
					gameEnded();
					// submit computer as a winner to the server
					red > condition && postWinner('computer', Date.now());
					// submit player as a winner to the server
					green > condition && postWinner('player', Date.now());

					// RESET GAME BOARD
					if (references[0]) {
						references.map((item) => {
							item.current.classList = 'game-item';
							return;
						});
					}
				}
			}
		},
		// eslint-disable-next-line
		[ gameState, red, green ]
	);

	return <div className="Game">{items}</div>;
};

export default PlayArea;
