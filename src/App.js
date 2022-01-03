import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MultiRangeSlider from './components/MultiRangeSlider';
import Description from './Description';
function App() {
	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(75);
	const handleInput = (e) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
			</header>
			<div>
				<h1>multi-range-slider-react demo</h1>
			</div>
			<div className='multi-range-slider-container'>
				<MultiRangeSlider
					// baseClassName='multi-range-slider-black'
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
				<br />
				<br />
				<br />
				<div className='divOutput'>
					minValue={minValue} <br /> maxValue={maxValue}
				</div>
				<br />
				<br />
				<br />
			</div>
			<Description />
			<br />
			<br />
			<br />
		</div>
	);
}

export default App;
