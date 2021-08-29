function Desciption() {
	return (
		<div style={{ margin: 'auto' }}>
			app.js
			<br />
			<pre style={{ textAlign: 'left', display: 'inline-block', overflow: 'auto', margin: 'auto', border: 'solid 1px black', padding: '0px 30px' }}>{`
import React, { useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
function App() {
	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(75);
	const handleInput = (e) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};

	return (
	<div className='App'>
		<MultiRangeSlider
			min={0}
			max={100}
			step={5}
			ruler={true}
			label={true}
			preventWheel={false}
			minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
			}}
		/>
	</div>
	);
}

export default App;
				
				`}</pre>
		</div>
	);
}
export default Desciption;
