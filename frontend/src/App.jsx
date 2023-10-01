// import {useState} from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '../../../../../../../vite.svg';
import {useSelector} from 'react-redux';
import './App.css';
import UserForm from './components/UserForm/UserForm.jsx';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CreateGameForm from './components/CreateGameForm/CreateGameForm.jsx';
import ListarPartidas from './components/ListarPartidas/ListarPartidas';

function App() {
	const Test = () => {
		const userId = useSelector((state) => state.player.id);

		return (
			<div>
				<h1>ESTA WORKING BROTHER MAN</h1>
				<h1>Y el id es {userId}</h1>
			</div>
		);
	};

	return (
		<BrowserRouter>
			<div>
				<Link to='/'></Link>
			</div>

			<Routes>
				<Route path='/' element={<UserForm />} />
				<Route path='/CreateGame' element={<CreateGameForm />} />
				<Route path='/Games' element={<ListarPartidas />} />
				<Route path='/Games/Partida-Inicial' element={<Test />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
