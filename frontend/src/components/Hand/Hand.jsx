import './Hand.css';
import Card from '../../components/Card/Card.jsx';
import getHand from '../request/getHand';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setHand, selectCard, cleanSelectedCard} from '../../appActions';

// represents a player's hand
const Hand = () => {
	const userId = useSelector((state) => state.game.currentPlayer);
	const cards = useSelector((state) => state.hand.cards);
	const selectedCard = useSelector((state) => state.hand.selectedCard);
	const dispatch = useDispatch();

	// when component mounts
	useEffect(() => {
		const fetchHand = async () => {
			const res = await getHand(userId);
			dispatch(setHand(res.cards));
		};
		fetchHand();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/*
		Select a card if clicked for the first time.
		Unselect if clicked twice.
	*/
	const handleClick = async (clickedCard) => {
		if (selectedCard !== clickedCard) {
			dispatch(selectCard(clickedCard));
		} else {
			dispatch(cleanSelectedCard());
		}
	};

	// render cards in hand side by side

	return (
		<div className='hand' data-testid='hand'>
			{cards?.map((card) => (
				<Card
					className={`card ${selectedCard === card ? 'selected' : ''}`}
					key={card.id}
					onClick={() => handleClick(card)}
					info={card}
					front={true}
					test-id='handCard'
				/>
			))}
		</div>
	);
};

export default Hand;
