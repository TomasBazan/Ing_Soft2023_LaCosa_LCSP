import Card from '../Card/Card.jsx';
import getCard from '../request/getCard';
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appendToHand} from '../../services/handSlice';
import {addToPlayArea} from '../../appActions.js';

const TYPE_PANIC = 0;

const Deck = () => {
	// userId del jugador en turno, deberíamos obtenerlo del estado de la partida
	// const userId = 1;
	// TODO: @klartz revisar cambio de linea 10 por lines 11-12
	const gameStatus = useSelector((state) => state.game);
	const firstDeckCardBack = useSelector(
		(state) => state.game.firstDeckCardBack,
	);
	const idPlayer = gameStatus.currentPlayer;

	const [clicked, setClicked] = useState(false);
	const [card, setCard] = useState(null);
	const [displayFront, setDisplayFront] = useState(false);
	const dispatch = useDispatch();

	// when deck mounts
	useEffect(() => {
		setCard({token: '', type: firstDeckCardBack});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// when deck is clicked
	const handleClick = async () => {
		// if it wasn't clicked already
		if (!clicked) {
			const res = await getCard({idPlayer});
			const pickedCards = res.pickedCards[0];

			// display first card
			setCard(pickedCards);
			setDisplayFront(true);

			// wait and update player's hand with picked card
			setTimeout(() => {
				if (pickedCards.type === TYPE_PANIC) {
					dispatch(addToPlayArea({card: pickedCards, target: -1}));
				} else {
					dispatch(appendToHand([pickedCards]));
				}

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
