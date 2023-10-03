import './PlayArea.css';
import Card from '../../components/Card/Card.jsx';

import {useSelector} from 'react-redux';

const PlayArea = () => {
	const card = useSelector((state) => state.playArea.card);

	return (
		<div className='play-area'>{card !== '' && <Card token={card} />}</div>
	);
};

export default PlayArea;
