// import {useState} from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '../../../../../../../vite.svg';
// import {useSelector} from 'react-redux';
import UserForm from './components/UserForm/UserForm.jsx';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CreateGameForm from './components/CreateGameForm/CreateGameForm.jsx';
import ListarPartidas from './components/ListarPartidas/ListarPartidas';
import Game from './components/Game/Game.jsx';
import Lobby from './components/Lobby/Lobby';
import FinishGame from './containers/FinishGame';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Link to='/'></Link>
			</div>

			<Routes>
				<Route path='/' element={<UserForm />} />
				<Route path='/CreateGame' element={<CreateGameForm />} />
				<Route path='/Games' element={<ListarPartidas />} />
				<Route path='/Games/:gameId' element={<Lobby />} />
				<Route path='/Games/:gameId/play' element={<Game />} />
				<Route path='/Games/:gameId/finish' element={<FinishGame />} />
				{/* 
				{
          path: "/matches/:matchId",
          element: <LobbyContainer />,
        }, */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
