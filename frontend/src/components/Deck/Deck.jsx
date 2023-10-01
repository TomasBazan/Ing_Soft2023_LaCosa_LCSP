import Card from '../Card/Card.jsx';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {appendToHand} from '../../services/handSlice';

const Deck = () => {
	const backImage = 'img65';

	const [clicked, setClicked] = useState(false);
	const [imageSrc, setImageSrc] = useState(backImage);
	const dispatch = useDispatch();

	const mockPick = JSON.parse(
		JSON.stringify({
			status: '',
			message: '',
			data: ['img197'],
		}),
	);

	// when deck is clicked
	const handleClick = () => {
		// try {
		// 	// fetches the next card in deck
		// 	const response = await fetch('http://localhost:8000/hand/', {
		// 		method: 'PUT',
		// 	});
		// 	setImageSrc(response.json().data);
		// } catch (error) {
		// 	console.error("Error fetching player's hand:", error);
		// }

		// if it wasn't clicked already
		if (!clicked) {
			// display first hand
			setImageSrc(mockPick.data[0]);
			// wait and update player's hand with picked card
			setTimeout(() => {
				dispatch(appendToHand(mockPick.data));
				// display back of next card in deck
				setImageSrc(backImage);
			}, 1000);
			// set clicked to true to avoid infinite picking of cards
			setClicked(true);
		}
	};

	return (
		<div className='deck'>
			<Card onClick={handleClick} token={imageSrc} />
		</div>
	);
};

export default Deck;
