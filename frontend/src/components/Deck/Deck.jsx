import Card from '../Card/Card.jsx';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {appendToHand} from '../../services/handSlice';

const Deck = () => {
	const backImage = 'reverse';

	const [clicked, setClicked] = useState(false);
	const [imageSrc, setImageSrc] = useState(backImage);
	const dispatch = useDispatch();

	// when deck is clicked
	const handleClick = async () => {
		try {
			// fetches the next card in deck
			const response = await fetch('/hand', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const res = await response.json();
			// if it wasn't clicked already
			if (!clicked) {
				const pickedCard = res.data;
				// display first card
				setImageSrc(pickedCard[0]); // doesn't consider cases where more than card is picked
				// wait and update player's hand with picked card
				setTimeout(() => {
					dispatch(appendToHand(pickedCard));
					// display back of next card in deck
					setImageSrc(backImage);
				}, 500);
				// set clicked to true to avoid infinite picking of cards
				setClicked(true);
			}
		} catch (error) {
			console.error("Error fetching player's hand:", error);
		}
	};

	return (
		<div className='deck'>
			<Card className='card' onClick={handleClick} token={imageSrc} />
		</div>
	);
};

export default Deck;
