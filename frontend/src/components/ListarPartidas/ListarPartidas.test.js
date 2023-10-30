import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import {MemoryRouter} from 'react-router-dom';
import 'jest-localstorage-mock';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {screen, waitFor} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import ListarPartidas from './ListarPartidas';
import getGameList from '../request/getGameList';
import joinGame from '../request/joinGame';

jest.mock('../request/getGameList');
jest.mock('../request/joinGame'); // Mock joinGame

describe('Listar partidas component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const playerState = {
		player: {
			name: 'pedro', // Set the desired initial state values
			id: 3,
			loged: true,
		},
	};

	// Define a theme to use in the ChakraProvider
	const theme = extendTheme({
		styles: {
			global: {
				body: {
					bgGradient: 'linear(to-r, whatsapp.800,black,whatsapp.800)',
				},
			},
		},
	});

	const renderComponent = () => {
		return renderWithProviders(
			<ChakraProvider theme={theme}>
				<MemoryRouter initialEntries={['/Games/']} initialIndex={0}>
					<ListarPartidas />
				</MemoryRouter>
			</ChakraProvider>,
		);
	};

	test('should render the component without games available', async () => {
		getGameList.mockResolvedValueOnce({
			status_code: 200,
			detail: 'Joinable games list.',
			games: [],
		});

		window.sessionStorage.setItem('player', JSON.stringify(playerState.player));
		renderComponent();
		await waitFor(() =>
			expect(
				screen.getByText('No hay partidas disponibles'),
			).toBeInTheDocument(),
		);
	});

	test('should render the component with one game available', async () => {
		getGameList.mockResolvedValueOnce({
			status_code: 200,
			detail: 'Joinable games list.',
			games: [
				{
					game_id: 2,
					player_quantity: 1,
					max_players: 4,
					name: 'maslaton',
				},
			],
		});
		const user = userEvent.setup();

		window.sessionStorage.setItem('player', JSON.stringify(playerState.player));
		renderComponent();
		await waitFor(() => {
			expect(screen.getByText('maslaton')).toBeInTheDocument();
			expect(screen.getByText('Jugadores: 1/4')).toBeInTheDocument();
			expect(screen.getByRole('button', {name: 'Unirse'})).toBeInTheDocument();
		});

		user.click(screen.getByRole('button', {name: 'Unirse'}));

		await waitFor(() => {
			expect(joinGame).toHaveBeenCalledTimes(1);
		});
	});

	test('should render the component with one game available', async () => {
		getGameList.mockRejectedValue({detail: 'The games info can not be fetch'});

		window.sessionStorage.setItem('player', JSON.stringify(playerState.player));
		renderComponent();

		await waitFor(() => {
			expect(
				screen.getByText('The games info can not be fetch'),
			).toBeInTheDocument();
		});
	});
});
