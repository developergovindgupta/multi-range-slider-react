import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import MultiRangeSlider from './components/MultiRangeSlider';
import Description from './Description';
function App() {
	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(75);
	const handleInput = (e) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};
	const ref = useRef();
	useEffect(() => {
		// console.log('ref:', ref);
	});
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
					ref={ref}
					// baseClassName='multi-range-slider-black'
					min={0}
					max={200}
					step={5}
					ruler={true}
					label={true}
					preventWheel={false}
					minValue={minValue}
					maxValue={maxValue}
					minFormatter={(e) => `${Math.floor(e / 60)}:${Math.round(e % 60).toString().padStart(2, '0')}`}
					maxFormatter={(e) => `${Math.floor(e / 60)}:${Math.round(e % 60).toString().padStart(2, '0')}`}
					minValueFormatter={(e) => `${Math.floor(e / 60)}:${Math.round(e % 60).toString().padStart(2, '0')}`}
					maxValueFormatter={(e) => `${Math.floor(e / 60)}:${Math.round(e % 60).toString().padStart(2, '0')}`}
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
				<MultiRangeSlider
					baseClassName='multi-range-slider-black'
					min={0}
					max={200}
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
			</div>
			<Description />
			<br />
			<br />
			<br />
		</div>
	);
}

export default App;
