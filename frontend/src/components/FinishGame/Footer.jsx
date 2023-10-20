// eslint-disable-next-line no-unused-vars
import React from 'react';
import {CardFooter, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
export const GoHome = () => {
	return (
		<CardFooter display='flex' justifyContent='center' justify='center'>
			<Link to='/'>
				<Button
					variant='outline'
					colorScheme='transparent'
					_hover={{
						bg: 'green.500',
					}}
				>
					Play Again
				</Button>
			</Link>
		</CardFooter>
	);
};
export default GoHome;
