import PropTypes from 'prop-types';
import './Card.css';

const Card = ({className, onClick, token}) => {
	// const bool = true;

	return (
		<button className={className}>
			<img
				className='card-image'
				src={`http://localhost:5173/src/assets/cards/${token}.jpg`}
				alt='card'
				onClick={onClick}
			/>
		</button>
	);
};

Card.propTypes = {
	token: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

export default Card;
