import {VStack, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import joinGame from '../request/joinGame';
import {useSelector} from 'react-redux';

const partidas = [
	{nombre: 'Partida-Inicial'},
	// Otras partidas...
];

const ListarPartidas = () => {
	const userId = useSelector((state) => state.player.id);

	const handleUnirse = async () => {
		console.log('me clickearon');

		try {
			const resp = await joinGame({idGame: 1, idUser: userId});
			alert(resp.detail);
			console.log('la respuesta es', resp);
		} catch (error) {
			alert(error.detail);
		}
	};
	return (
		<VStack spacing={4}>
			{partidas.map((partida, index) => (
				<div key={index}>
					<span>{partida.nombre}</span>
					<Link to='/Games/Partida-Inicial'>
						<Button
							colorScheme='teal'
							size='sm'
							onClick={() => handleUnirse(partida.id)}
						>
							Unirse
						</Button>
					</Link>
				</div>
			))}
		</VStack>
	);
};

export default ListarPartidas;
