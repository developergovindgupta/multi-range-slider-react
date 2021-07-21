import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MultiRangeSlider from './components/MultiRangeSlider';
function App() {
	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(75);
	const min = 0;
	const max = 100;
	const step = 5;

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
					min={min}
					max={max}
					minValue={minValue}
					maxValue={maxValue}
					step={step}
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
			</div>
		</div>
	);
}

export default App;
