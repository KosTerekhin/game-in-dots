import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LeaderBoard from './layout/leaderboard/LeaderBoard';
import GameBoard from './layout/game/GameBoard';
import GameState from './context/game/GameState';
import UserState from './context/user/UserState';

const App = () => {
	return (
		<GameState>
			<UserState>
				<div className="App">
					<GameBoard />
					<LeaderBoard />
				</div>
			</UserState>
		</GameState>
	);
};

export default App;
