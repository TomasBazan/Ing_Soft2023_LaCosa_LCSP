import './Card.css';
import PropTypes from 'prop-types';

const backImageFromType = {
	0: 'panic-reverse.jpg', // panic
	1: 'reverse.jpg', // stay away
	2: 'reverse.jpg', // infected
	3: 'reverse.jpg', // it
};

const Card = ({className, onClick, info, front}) => {
	// Determines the image source for a card based on its front/back status.
	const cardImageSource = (front) => {
		if (front) {
			return info?.token;
		} else {
			return backImageFromType[info?.type];
		}
	};

	return (
		<button className={className} data-testid='card-button'>
			<img
				className='card-image'
				src={`http://localhost:5173/src/assets/cards/${cardImageSource(front)}`}
				alt={`card ${cardImageSource(front)}`}
				onClick={onClick}
				data-testid='card-image'
			/>
		</button>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	info: PropTypes.shape({
		id: PropTypes.string,
		token: PropTypes.string,
		type: PropTypes.number,
	}),
	front: PropTypes.bool,
};

Card.defaultProps = {
	className: 'card',
};

export default Card;
