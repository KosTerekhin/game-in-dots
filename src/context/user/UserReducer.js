export default (state, action) => {
	switch (action.type) {
		case 'SET_CURRENT_PLAYER':
			return {
				...state,
				currentUser: {
					...state.currentUser,
					name: action.payload
				}
			};

		case 'SET_START_TIME':
			return {
				...state,
				currentUser: {
					...state.currentUser,
					startTime: action.payload
				}
			};
		case 'SET_END_TIME':
			return {
				...state,
				currentUser: {
					...state.currentUser,
					endTime: action.payload
				}
			};

		case 'WINNER_POSTED':
			return {
				...state,
				currentUser: {
					name: '',
					date: null,
					startTime: null
				},
				currentWinner: action.payload.name,
				allPlayers: [ ...state.allPlayers, action.payload ]
			};
		default:
			return state;
	}
};
