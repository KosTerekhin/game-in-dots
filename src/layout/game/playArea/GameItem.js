import React from 'react';

const GameItem = (props) => {
	const { increaseCount, field, forwardRef } = props;

	// HANDLE CLICK or ADD GREEN COLOR
	const handleClick = () => {
		// getting REF from parent
		const divClass = forwardRef.current.classList;

		if (divClass.contains('blue')) {
			divClass.remove('blue');
			divClass.add('green');
			increaseCount('green');
		}
	};

	let itemStyle = {
		flexBasis: `${100 / field}%`,
		height: `${350 / field}px`
	};

	return <div ref={forwardRef} className="game-item" style={itemStyle} onClick={handleClick} />;
};

export default GameItem;
