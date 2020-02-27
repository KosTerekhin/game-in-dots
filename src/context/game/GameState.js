import React, { useReducer } from 'react';
import GameContext from './GameContext';
import GameReducer from './GameReducer';
import Axios from 'axios';

import '../../config';

const GameState = (props) => {
	const initialState = {
		gameSettings: null,
		gameState: 'default',
		count: {
			red: 0,
			green: 0
		},
		currentGame: {},
		randomArray: [],
		error: null
	};

	const [ state, dispatch ] = useReducer(GameReducer, initialState);
	const serverProxy = global.config.proxy;

	// GAME SETTING SELECT
	const changeGame = (params) => {
		dispatch({
			type: 'SET_GAME',
			payload: params
		});
	};

	// PLAY BUTTON CLICKED
	const playButton = () => {
		dispatch({
			type: 'START_GAME'
		});
	};

	// UPDATE STATE ON GAME CHANGE
	const gameEnded = () => {
		dispatch({
			type: 'GAME_ENDED'
		});
	};

	// COUNTING POINTS
	const increaseCount = (type) => {
		type === 'red' &&
			dispatch({
				type: 'UPDATE_RED'
			});
		type === 'green' &&
			dispatch({
				type: 'UPDATE_GREEN'
			});
	};

	// FETCH GAME SETTINGS
	const fetchGameSettings = async () => {
		try {
			const res = await Axios.get(`${serverProxy}/game-settings`);

			dispatch({
				type: 'GET_SETTINGS',
				payload: res.data
			});
			changeGame(res.data[Object.keys(res.data)[0]]);
		} catch (error) {
			dispatch({
				type: 'NO_SETTINGS'
			});
		}
	};

	// NAME VALIDATION
	const setNameError = () => {
		dispatch({
			type: 'INVALID_NAME'
		});
	};

	const updateRandomArray = (random) => {
		dispatch({
			type: 'UPDATE_RANDOM',
			payload: random
		});
	};

	return (
		<GameContext.Provider
			value={{
				gameSettings: state.gameSettings,
				gameState: state.gameState,
				currentGame: state.currentGame,
				count: state.count,
				randomArray: state.randomArray,
				error: state.error,
				fetchGameSettings,
				changeGame,
				playButton,
				gameEnded,
				setNameError,
				increaseCount,
				updateRandomArray
			}}
		>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameState;
