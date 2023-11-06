import joinGame from '../request/joinGame';
import getGameList from '../request/getGameList';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Center, VStack, Box, Text, Button} from '@chakra-ui/react';

const ListarPartidas = () => {
	const navigate = useNavigate();
	const userId = JSON.parse(sessionStorage.getItem('player')).id;
	const [partidas, setPartidas] = useState([]); // Initialize partidas as an empty array
	const [alert, setAlert] = useState();
	const [alert1, setAlert1] = useState();

	useEffect(() => {
		const buscarPartidas = async () => {
			try {
				const resp = await getGameList();
				setPartidas(resp.games);
			} catch (error) {
				setAlert(error.detail);
				setPartidas([]);
			}
		};
		buscarPartidas();
	}, []);

	const handleUnirse = async (gameId) => {
		const bodyRequest = {
			idGame: gameId,
			password: null,
			idUser: userId,
		};

		try {
			const resp = await joinGame(bodyRequest);
			const game = {
				id: gameId,
			};
			sessionStorage.setItem('gameId', JSON.stringify(game));
			console.log(resp);
			navigate(`/Games/${gameId}`);
		} catch (error) {
			setAlert1(error.detail);
		}
	};
	return (
		<Center mt={4}>
			<VStack spacing={4}>
				{alert ? (
					<Text color='red.600' fontSize='xl'>
						{alert}
					</Text>
				) : null}
				{alert1 ? (
					<Text color='red.600' fontSize='xl'>
						{alert1}
					</Text>
				) : null}
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
