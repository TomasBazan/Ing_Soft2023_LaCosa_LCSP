import './Hand.css';

import {useEffect, useState} from 'react';
import Card from '../../components/Card/Card.jsx';

// mock format of json response. Player's hand is an array of card tokens
const mock = JSON.parse(
	'{"status": "", "message": "","data": ["img37", "img40","img72"]}',
);

const Hand = () => {
	// save the player's hand as an array
	const [cards, setCards] = useState([]);

	useEffect(() => {
		// const fetchHand = async () => {
		// 	try {
		// 		// fetches the player's hand
		// 		const response = await fetch('http://localhost:8000/hand/', {
		// 			method: 'GET'
		// 		});
		// 		setCards(response.json().data);
		// 	} catch (error) {
		// 		console.error("Error fetching player's hand:", error);
		// 	}
		// };
		// fetchHand();
		setCards(mock.data);
	}, []);

	return (
		<div className='hand'>
			{cards.map((card) => (
				<Card key={card} token={card} />
			))}
		</div>
	);
};

export default Hand;
