import logo from './logo.svg';
import './styles/App.css';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';

const App = () => {
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		const newCounter = counter + 1;
		setCounter(newCounter + 1);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(0);
		}, 5000);
		return () => clearInterval(interval);
	});

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
			<p>The counter is: {counter}</p>
			<body className='boton'>
				<Button variant='text' onClick={handleClick}>
					First Button
				</Button>
			</body>
		</div>
	);
};

export default App;
