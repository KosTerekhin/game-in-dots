export default (state, action) => {
	switch (action.type) {
		case 'GET_SETTINGS':
			return {
				...state,
				gameSettings: action.payload
			};

		case 'SET_GAME':
			return {
				...state,
				currentGame: action.payload
			};

		case 'START_GAME':
			return {
				...state,
				gameState: 'game',
				error: null
			};

		case 'UPDATE_RED': {
			return {
				...state,
				count: {
					...state.count,
					red: state.count.red + 1
				}
			};
		}

		case 'UPDATE_GREEN': {
			return {
				...state,
				count: {
					...state.count,
					green: state.count.green + 1
				}
			};
		}
		case 'GAME_ENDED':
			return {
				...state,
				gameState: 'over',
				count: {
					red: 0,
					green: 0
				},
				randomArray: []
			};

		case 'UPDATE_RANDOM':
			return {
				...state,
				randomArray: [ ...state.randomArray, action.payload ]
			};

		case 'NO_SETTINGS':
			return {
				...state,
				error: 'No game settings, server error'
			};

		case 'INVALID_NAME':
			return {
				...state,
				gameState: 'error',
				error: 'Enter a name to start the game'
			};
		default:
			return state;
	}
};
