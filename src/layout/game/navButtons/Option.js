import React from 'react';

const Option = (props) => {
	const { setting, field, delay } = props;
	let option = (
		<option field={field} delay={delay}>
			{setting}: {field}x{field} play area size and {delay / 1000}s delay
		</option>
	);
	return option;
};

export default Option;
