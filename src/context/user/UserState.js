import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import Axios from 'axios';
import '../../config';

const UserState = (props) => {
	const initialState = {
		currentUser: {
			name: '',
			startTime: null
		},
		currentWinner: '',
		allPlayers: [],
		serverMsg: null
	};

	const [ state, dispatch ] = useReducer(UserReducer, initialState);
	const serverProxy = global.config.proxy;

	const postWinner = async (winner, endTime) => {
		// winner to send on the server
		let newWinner = {
			date: new Date().toLocaleString()
		};
		if (winner === 'player') {
			newWinner.winner = state.currentUser.name;
		} else {
			newWinner.winner = winner;
		}
		// user to update the UI
		const newPlayer = {
			name: newWinner.winner,
			time: (endTime - state.currentUser.startTime) / 1000,
			date: newWinner.date
		};

		dispatch({
			type: 'WINNER_POSTED',
			payload: newPlayer
		});

		try {
			await Axios.post(`${serverProxy}/winners`, newWinner);

			dispatch({
				type: 'SERVER_UPDATED'
			});

			setTimeout(() => {
				dispatch({
					type: 'CLEAR_MESSAGE'
				});
			}, 2000);
		} catch (error) {
			dispatch({
				type: 'SERVER_REJECTED'
			});

			setTimeout(() => {
				dispatch({
					type: 'CLEAR_MESSAGE'
				});
			}, 2000);

			throw error;
		}
	};

	const setUser = (user) => {
		dispatch({
			type: 'SET_CURRENT_PLAYER',
			payload: user
		});
	};

	const setStartTime = (time) => {
		dispatch({
			type: 'SET_START_TIME',
			payload: time
		});
	};

	return (
		<UserContext.Provider
			value={{
				currentUser: state.currentUser,
				allUsers: state.allUsers,
				allPlayers: state.allPlayers,
				currentWinner: state.currentWinner,
				serverMsg: state.serverMsg,
				setUser,
				postWinner,
				setStartTime
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
