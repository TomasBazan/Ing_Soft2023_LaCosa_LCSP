import Card from '../Card/Card.jsx';
import getCard from '../request/getCard';
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appendToHand} from '../../services/handSlice';

const Deck = () => {
	// userId del jugador en turno, deberíamos obtenerlo del estado de la partida
	// const userId = 1;
	// TODO: @klartz revisar cambio de linea 10 por lines 11-12
	const gameStatus = useSelector((state) => state.game);
	const userId = gameStatus.currentPlayerId;

	const [clicked, setClicked] = useState(false);
	const [card, setCard] = useState(null);
	const [displayFront, setDisplayFront] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// TODO: deberíamos obtener el tipo de la primera carta cuando empieza la partida
		setCard({token: 'panic', type: 1});
	}, []);

	// when deck is clicked
	const handleClick = async () => {
		// if it wasn't clicked already
		if (!clicked) {
			const res = await getCard(userId);
			const pickedCards = res.pickedCards[0];

			// display first card
			setCard(pickedCards);
			setDisplayFront(true);

			// wait and update player's hand with picked card
			setTimeout(() => {
				dispatch(appendToHand([pickedCards]));

				setCard({type: res.nextCardType});
				setDisplayFront(false);
			}, 1000);

			// set clicked to true to avoid infinite picking of cards
			setClicked(true);
		}
	};
	return (
		<div className='deck'>
			<Card onClick={handleClick} info={card} front={displayFront} />
		</div>
	);
};

export default Deck;
