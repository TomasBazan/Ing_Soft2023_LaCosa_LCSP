import './PlayArea.css';
import Card from '../../components/Card/Card.jsx';

import {useSelector} from 'react-redux';

const PlayArea = () => {
	const card = useSelector((state) => state.playArea.card);

	// display card in play area. If card is empty, display nothing
	return (
		<div className='play-area'>
			{card !== '' && <Card info={card} front={true} />}
		</div>
	);
};

export default PlayArea;
