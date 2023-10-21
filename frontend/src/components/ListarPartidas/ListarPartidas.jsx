import joinGame from '../request/joinGame';
import getGameList from '../request/getGameList';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Center, VStack, Box, Text, Button} from '@chakra-ui/react';

const ListarPartidas = () => {
	const navigate = useNavigate();
	const userId = JSON.parse(sessionStorage.getItem('player')).id;
	const [partidas, setPartidas] = useState([]); // Initialize partidas as an empty array

	useEffect(() => {
		const buscarPartidas = async () => {
			try {
				const resp = await getGameList();
				setPartidas(resp.games);
			} catch (error) {
				console.log('la respuesta es en catch :', error);
				setPartidas([]);
				// alert(error.detail);
			}
		};
		buscarPartidas();
	}, [partidas]);

	const handleUnirse = async (gameId) => {
		console.log('el id de la partida es', gameId);
		const bodyRequest = {
			idGame: gameId,
			password: null,
			idUser: userId,
		};

		try {
			const resp = await joinGame(bodyRequest);
			console.log(resp);
			const game = {
				id: gameId,
			};
			sessionStorage.setItem('gameId', JSON.stringify(game));
			navigate(`/Games/${gameId}`);
		} catch (error) {
			console.log('el error es', error);
			// alert(error.detail);
		}
	};
	return (
		<Center mt={4}>
			<VStack spacing={4}>
				{partidas.length > 0 ? (
					partidas.map((partida, index) => (
						<Box
							key={index}
							borderWidth='10px'
							p={10}
							borderRadius='md'
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							width='150%'
							opacity='0.9'
						>
							<div>
								<Text color='white' fontWeight='bold'>
									{partida.name}
								</Text>
								<Text color='white'>
									Jugadores: {partida.player_quantity}/{partida.max_players}
								</Text>
							</div>
							<div>
								{partida.player_quantity < partida.max_players && (
									<Button
										colorScheme='transparent'
										variant='outline'
										color='white'
										_hover={{
											bg: 'green.600',
										}}
										size='sm'
										onClick={() => handleUnirse(partida.game_id)}
									>
										Unirse
									</Button>
								)}
							</div>
						</Box>
					))
				) : (
					// Render a message when partidas array is empty
					<Text color='white' fontWeight='bold' fontSize='3xl'>
						No hay partidas disponibles
					</Text>
				)}
			</VStack>
		</Center>
	);
};

export default ListarPartidas;
