// import { stringify } from "uuid";

const isValidCard = (cardToken) => {
	const cardName = getCardName(cardToken);
	return cardName !== 'infectado' && cardName !== 'la cosa';
};

/* Get a card's name from a token
   ! Van solo listadas las cartas implementadas y las de infección
*/
const getCardName = (cardToken) => {
	const cardID = parseInt(String(cardToken).match(/\d\d/));

	switch (true) {
		case cardID === 1:
			return 'la cosa';

		case cardID >= 2 && cardID <= 21:
			return 'infectado';

		case cardID >= 22 && cardID <= 26:
			return 'lanzallamas';

		case cardID >= 48 && cardID <= 49:
			return 'vigila tus espaldas';

		case cardID >= 50 && cardID <= 54:
			return 'cambio de lugar';

		default:
			return null;
	}
};

export default isValidCard;
