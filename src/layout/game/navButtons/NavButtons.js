import React, { useContext, useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import Option from './Option';
import Spinner from '../../../componenents/Spinner';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

import gameContext from '../../../context/game/GameContext';
import UserContext from '../../../context/user/UserContext';

const NavButtons = () => {
	const [ params, setParams ] = useState({
		gameParams: null,
		name: ''
	});

	const { gameParams, name } = params;
	const { gameState, gameSettings, fetchGameSettings, setNameError, changeGame, playButton } = useContext(
		gameContext
	);
	const { setUser } = useContext(UserContext);

	// FETCH GAME SETTINGS and SET SPINNER
	let spinnerShow = true;
	useEffect(
		() => {
			if (spinnerShow) {
				fetchGameSettings();
			}

			if (gameParams) {
				changeGame(gameParams);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ gameSettings, spinnerShow, gameParams ]
	);
	// turning off spinner
	gameSettings && (spinnerShow = false);

	// UPDATING GAME SETTINGS
	const updateGame = (e) => {
		const gameName = e.target.value.split(':')[0];
		setParams({
			...params,
			gameParams: gameSettings[gameName]
		});
	};
	// UPDATING PLAYER NAME
	const updateName = (e) => {
		setParams({
			...params,
			name: e.target.value
		});
	};

	// START THE GAME
	const handleSubmit = (e) => {
		e.preventDefault();

		if (params.name === '') {
			setNameError();
		} else {
			playButton();
			// adding user to state
			setUser(params.name);
		}
	};

	// SET PLAY BUTTON
	const Button = <CustomButton type={gameState} handleSubmit={handleSubmit} />;

	// ADD GAME SETTING INTO DOM
	let List;
	gameSettings &&
		(List = Object.keys(gameSettings).map((setting, index) => {
			return (
				<Option
					key={setting + index}
					setting={setting}
					field={gameSettings[setting].field}
					delay={gameSettings[setting].delay}
				/>
			);
		}));

	// RENDER
	if (spinnerShow) {
		return (
			<div className="GameNav">
				<Spinner />
			</div>
		);
	} else {
		return (
			<form className={gameState === 'game' ? 'GameNav Disabled' : 'GameNav'}>
				<Form.Group controlId="exampleForm.ControlSelect1">
					<Form.Label>Pick the game</Form.Label>
					<Form.Control as="select" size="lg" name="gameParams" onChange={updateGame}>
						{List}
					</Form.Control>
				</Form.Group>

				<InputGroup size="lg">
					<FormControl
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						placeholder="Enter your name"
						name="name"
						value={name}
						onChange={updateName}
					/>
				</InputGroup>

				{Button}
			</form>
		);
	}
};

export default NavButtons;
