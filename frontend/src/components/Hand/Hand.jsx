import './Hand.css';
import Card from '../../components/Card/Card.jsx';
import playCard from '../request/playCard';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	setHand,
	removeFromHand,
	addToPlayArea,
	cleanPlayArea,
} from '../../appActions';

// represents a player's hand
const Hand = () => {
	const userId = 1;

	const [selectedCard, setSelectedCard] = useState(null);
	// select cards state
	const cards = useSelector((state) => state.hand.cards);
	const dispatch = useDispatch();

	// when component mounts
	useEffect(() => {
		// fetch  player's hand
		const fetchHand = async () => {
			try {
				const response = await fetch('/hand', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const res = await response.json();
				// set player's hand state using redux
				dispatch(setHand(res.data));
			} catch (error) {
				console.error("Error fetching player's hand:", error);
			}
		};
		fetchHand();
	}, [dispatch]);

	const handleClick = async (clickedCard) => {
		if (selectedCard === clickedCard) {
			console.log(clickedCard);

			const res = await playCard({userId, clickedCard});
			// hace falta checkear efecto de la jugada
			console.log(res);

			dispatch(removeFromHand(clickedCard));
			dispatch(addToPlayArea(clickedCard));
			setTimeout(() => dispatch(cleanPlayArea()), 1000);
		} else {
			setSelectedCard(clickedCard);
		}
	};

	// render cards in hand side by side
	return (
		<div className='hand'>
			{cards.map((card) => (
				<Card key={card} onClick={() => handleClick(card)} token={card} />
			))}
		</div>
	);
};

export default Hand;
