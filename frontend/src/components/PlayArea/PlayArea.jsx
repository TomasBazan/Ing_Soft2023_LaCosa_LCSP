import Card from '../../components/Card/Card.jsx';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromHand, addToDiscardPile} from '../../appActions';
import playCard from '../request/playCard';
import {Box} from '@chakra-ui/react';

const PlayArea = () => {
	const dispatch = useDispatch();

	const selectedCard = useSelector((state) => state.hand.selectedCard);
	const [displayCard, setDisplayCard] = useState('');

	const userId = useSelector((state) => state.game.userId);

	/*
		When clicking on the play area, the selected card is played (if there is one)
		Playing a card consists of removing it from the player's hand and adding it to the play area.
		Play area gets cleaned after 1 second.

		TODO: error handling. Check if player is allowed to play a card
	*/
	const handleClick = async () => {
		console.log('Click on play area');

		if (selectedCard) {
			// if card was played on the play area, then no target is selected
			// eslint-disable-next-line no-unused-vars
			const res = await playCard({selectedCard, userId, targetId: null});

			// TODO: manage card effects: lanzallamas, vigila tus espaldas, etc.

			setDisplayCard(selectedCard);
			dispatch(removeFromHand(selectedCard));

			setTimeout(() => {
				setDisplayCard('');
				dispatch(addToDiscardPile(selectedCard));
			}, 1000);

			console.log('Card played');
		}
	};

	// display card in play area. If card is empty, display nothing
	return (
		<Box w='100%' h='100%' className='play-area' onClick={handleClick}>
			{displayCard && <Card info={displayCard} front={true} />}
		</Box>
	);
};

export default PlayArea;
