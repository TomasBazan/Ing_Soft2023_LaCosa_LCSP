import Card from '../Card/Card.jsx';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {appendToHand} from '../../services/handSlice';

const Deck = () => {
	const [clicked, setClicked] = useState(false);
	const [imageSrc, setImageSrc] = useState([]);
	const dispatch = useDispatch();

	// inicializar el mazo con el primer fetch
	const mockInitGet = JSON.parse(
		JSON.stringify({
			status: '',
			message: '',
			data: ['img65'],
		}),
	);

	const mockPick = JSON.parse(
		JSON.stringify({
			status: '',
			message: '',
			data: ['img197'],
		}),
	);

	// when component mounts
	useEffect(() => {
		const fetchCard = async () => {
			// fetch back of first card in deck as initial state
			// image is hardcoded because http request does not work
			setImageSrc(mockInitGet.data[0]);
		};
		fetchCard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				setImageSrc(mockInitGet.data[0]);
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
