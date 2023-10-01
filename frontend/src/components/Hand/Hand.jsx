import './Hand.css';
import Card from '../../components/Card/Card.jsx';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setHand} from '../../services/handSlice';

// mock format of json response. Player's hand is an array of card tokens
const mock = JSON.parse(
	JSON.stringify({
		status: '',
		message: '',
		data: ['img37', 'img40', 'img72', 'img78'],
	}),
);

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
				const response = await fetch('/cards', {
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
			// dispatch is hardcoded because http request does not work at the moment
			dispatch(setHand(mock.data));
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
