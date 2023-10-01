import './Hand.css';
import Card from '../../components/Card/Card.jsx';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setHand} from '../../services/handSlice';

// represents a player's hand
const Hand = () => {
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

	// render cards in hand side by side
	return (
		<div className='hand'>
			{cards.map((card) => (
				<Card key={card} token={card} />
			))}
		</div>
	);
};

export default Hand;
