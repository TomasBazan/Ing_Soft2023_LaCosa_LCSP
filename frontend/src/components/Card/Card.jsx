import PropTypes from 'prop-types';
import './Card.css';

const Card = ({token}) => {
	console.log(token);
	console.log(typeof token);

	return (
		<button className='card-button'>
			<img
				className='card-image'
				src={`src/assets/cards/${token}.jpg`}
				alt='card'
			/>
		</button>
	);
};

Card.propTypes = {
	token: PropTypes.string.isRequired,
	onclick: PropTypes.func,
};

export default Card;
