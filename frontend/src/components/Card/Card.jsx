import PropTypes from 'prop-types';

const Card = ({className, onClick, token}) => {
	return (
		<button className={className}>
			<img
				className='card-image'
				src={`http://localhost:5173/src/assets/cards/${token}`}
				alt='card'
				onClick={onClick}
			/>
		</button>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	token: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

export default Card;
