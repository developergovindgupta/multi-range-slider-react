import React, { useState } from 'react';
import './MultiRangeSlider.css';

const MultiRangeSlider = (props) => {
	let baseClassName = props.baseClassName || 'multi-range-slider';
	const min = props.min || 0;
	const max = props.max || 100;
	const step = props.step || 5;
	const stepCount = (max - min) / step;
	const [minValue, set_minValue] = useState(props.minValue || 25);
	const [maxValue, set_maxValue] = useState(props.maxValue || 75);
	const [barMin, set_barMin] = useState(((minValue - min) / (max - min)) * 100);
	const [barMax, set_barMax] = useState(((max - maxValue) / (max - min)) * 100);

	let barBox = null;
	let startX = null;
	let barValue = 0;
	let bar = null;
	let onBarLeftClick = (e) => {
		let _minValue = minValue - step;
		if (_minValue < min) {
			_minValue = min;
		}
		set_minValue(_minValue);
		let _barMin = ((_minValue - min) / (max - min)) * 100;
		set_barMin(_barMin);
	};
	let onInputMinChange = (e) => {
		let _minValue = parseFloat(e.target.value);
		if (_minValue > maxValue - step) {
			_minValue = maxValue - step;
		}
		set_minValue(_minValue);
		let _barMin = ((_minValue - min) / (max - min)) * 100;
		set_barMin(_barMin);
	};
	let onLeftThumbMousedown = (e) => {
		startX = e.clientX;
		if (e.type === 'touchstart') {
			if (e.touches.length === 1) {
				startX = e.touches[0].clientX;
			} else {
				return;
			}
		}

		barValue = minValue;
		bar = e.target.parentNode;
		barBox = bar.getBoundingClientRect();
		document.addEventListener('mousemove', onLeftThumbMousemove);
		document.addEventListener('mouseup', onLeftThumbMouseup);
		document.addEventListener('touchmove', onLeftThumbMousemove);
		document.addEventListener('touchend', onLeftThumbMouseup);
		bar.classList.add('active');
	};
	let onLeftThumbMousemove = (e) => {
		let clientX = e.clientX;
		if (e.type === 'touchmove') {
			clientX = e.touches[0].clientX;
		}
		let dx = clientX - startX;
		let per = dx / barBox.width;
		let val = barValue + (max - min) * per;
		let strSetp = '' + step;
		let fixed = 0;
		strSetp.indexOf('.') >= 0 && (fixed = 2);
		val = parseFloat(val.toFixed(fixed));
		if (val < min) {
			val = min;
		} else if (val > maxValue - step) {
			val = maxValue - step;
		}
		set_minValue(val);
		let _barMin = ((val - min) / (max - min)) * 100;
		set_barMin(_barMin);
		triggerInput(val, maxValue);
	};
	let onLeftThumbMouseup = (e) => {
		document.removeEventListener('mousemove', onLeftThumbMousemove);
		document.removeEventListener('mouseup', onLeftThumbMouseup);
		document.removeEventListener('touchmove', onLeftThumbMousemove);
		document.removeEventListener('touchend', onLeftThumbMouseup);
		bar.classList.remove('active');
	};
	let onInnerBarLeftClick = (e) => {
		let _minValue = minValue + step;
		if (_minValue > maxValue - step) {
			_minValue = maxValue - step;
		}
		set_minValue(_minValue);
		let _barMin = ((_minValue - min) / (max - min)) * 100;
		set_barMin(_barMin);
	};
	let onInnerBarRightClick = (e) => {
		let _maxValue = maxValue - step;
		if (_maxValue < minValue + step) {
			_maxValue = minValue + step;
		}
		set_maxValue(_maxValue);
		let _barMax = ((max - _maxValue) / (max - min)) * 100;
		set_barMax(_barMax);
	};
	let onInputMaxChange = (e) => {
		let _maxValue = parseFloat(e.target.value);
		if (_maxValue < minValue + step) {
			_maxValue = minValue + step;
		}
		set_maxValue(_maxValue);
		let _barMax = ((max - _maxValue) / (max - min)) * 100;
		set_barMax(_barMax);
	};
	let onRightThumbMousedown = (e) => {
		startX = e.clientX;
		if (e.type === 'touchstart') {
			if (e.touches.length === 1) {
				startX = e.touches[0].clientX;
			} else {
				return;
			}
		}

		barValue = maxValue;
		bar = e.target.parentNode;
		barBox = bar.getBoundingClientRect();
		document.addEventListener('mousemove', onRightThumbMousemove);
		document.addEventListener('mouseup', onRightThumbMouseup);
		document.addEventListener('touchmove', onRightThumbMousemove);
		document.addEventListener('touchend', onRightThumbMouseup);
		bar.classList.add('active');
	};
	let onRightThumbMousemove = (e) => {
		let clientX = e.clientX;
		if (e.type === 'touchmove') {
			clientX = e.touches[0].clientX;
		}
		let dx = clientX - startX;
		let per = dx / barBox.width;
		let val = barValue + (max - min) * per;
		let strSetp = '' + step;
		let fixed = 0;
		strSetp.indexOf('.') >= 0 && (fixed = 2);
		val = parseFloat(val.toFixed(fixed));
		if (val < minValue + step) {
			val = minValue + step;
		} else if (val > max) {
			val = max;
		}
		set_maxValue(val);
		let _barMax = ((max - val) / (max - min)) * 100;
		set_barMax(_barMax);
		triggerInput(minValue, val);
	};
	let onRightThumbMouseup = (e) => {
		document.removeEventListener('mousemove', onRightThumbMousemove);
		document.removeEventListener('mouseup', onRightThumbMouseup);
		document.removeEventListener('touchmove', onRightThumbMousemove);
		document.removeEventListener('touchend', onRightThumbMouseup);
		bar.classList.remove('active');
	};
	let onBarRightClick = (e) => {
		let _maxValue = maxValue + step;
		if (_maxValue > max) {
			_maxValue = max;
		}
		set_maxValue(_maxValue);
		let _barMax = ((max - _maxValue) / (max - min)) * 100;
		set_barMax(_barMax);
	};

	const triggerInput = (minValue, maxValue) => {
		let retObj = { min, max, minValue, maxValue };
		props.onInput && props.onInput(retObj);
		props.onChange && props.onChange(retObj);
	};

	return (
		<>
			<div className={baseClassName}>
				<div className='bar'>
					<div className='bar-left' style={{ width: barMin + '%' }} onClick={onBarLeftClick}></div>
					<input className='input-type-range input-type-range-min' type='range' min={min} max={max} step={step} value={minValue} onInput={onInputMinChange} />
					<div className='thumb thumb-left' onMouseDown={onLeftThumbMousedown} onTouchStart={onLeftThumbMousedown}>
						<div className='min-value'>{minValue}</div>
					</div>
					<div className='bar-inner'>
						<div className='bar-inner-left' onClick={onInnerBarLeftClick}></div>
						<div className='bar-inner-right' onClick={onInnerBarRightClick}></div>
					</div>
					<input className='input-type-range input-type-range-max' type='range' min={min} max={max} step={step} value={maxValue} onInput={onInputMaxChange} />
					<div className='thumb thumb-right' onMouseDown={onRightThumbMousedown} onTouchStart={onRightThumbMousedown}>
						<div className='max-value'>{maxValue}</div>
					</div>
					<div className='bar-right' style={{ width: barMax + '%' }} onClick={onBarRightClick}></div>
				</div>
				<div className='ruler'>
					{[...Array(stepCount)].map((e, i) => (
						<div key={i} className='ruler-rule'></div>
					))}
				</div>
				<div className='label'>
					<div className='label-min'>{min}</div>
					<div className='label-max'>{max}</div>
				</div>
			</div>
		</>
	);
};

export default MultiRangeSlider;
