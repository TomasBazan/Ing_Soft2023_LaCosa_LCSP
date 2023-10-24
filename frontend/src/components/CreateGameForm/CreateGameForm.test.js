// eslint-disable-next-line no-unused-vars
import React from 'react';
import {waitFor} from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import CreateGameForm from './CreateGameForm';
import {MemoryRouter} from 'react-router-dom';
import 'jest-localstorage-mock';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

jest.mock('../request/createGame.jsx', () => {
	const error = {
		status: 400,
		ok: false,
		detail: 'The game cannot be created',
	};

	return {
		__esModule: true,
		default: async ({game}) => {
			if (game.name === 'valid') {
				return {
					status: 200,
					ok: true,
					detail: 'Game valid created successfully.',
					gameId: 7,
				};
			} else if (game.name === 'invalid') {
				throw error;
			} else {
				throw error;
			}
		},
	};
});

// Create a custom initial state for the player slice
describe('Create Form', () => {
	beforeEach(() => {
		window.sessionStorage.clear();
	});
	test('should create game', async () => {
		const customInitialState = {
			player: {
				name: 'Mili', // Set the desired initial state values
				id: 123,
				loged: true,
			},
		};
		const history = createMemoryHistory();
		window.sessionStorage.setItem(
			'player',
			JSON.stringify(customInitialState.player),
		);

		jest.mock('react-router-dom', () => ({
			navigate: jest.fn(),
		}));
		const screen = renderWithProviders(
			<MemoryRouter initialEntries={['/CreateGame']} initialIndex={0}>
				<CreateGameForm />
			</MemoryRouter>,
			{
				preloadedState: customInitialState,
				history,
			},
		);
		const createGameInput = screen.getByRole('textbox', {
			id: 'GameName',
		});
		expect(createGameInput).toBeInTheDocument();

		userEvent.click(createGameInput);
		userEvent.type(createGameInput, 'valid');

		await waitFor(() => {
			expect(createGameInput).toHaveValue('valid');
		});

		const submitButton = screen.getByRole('button', {name: /Submit/i});
		expect(submitButton).toBeInTheDocument();

		// Assert that the success message is present
		/* 
		await waitFor(async () => {
			user.click(screen.getByRole('button', {name: 'Submit'}));
			console.log(history.location.pathname);
			expect(history.location.pathname).toBe('/');
		}); */
	});
	test('shouldnt  create game', async () => {
		const customInitialState = {
			player: {
				name: 'Mili',
				id: 0,
				loged: true,
			},
		};
		const user = userEvent.setup();
		window.sessionStorage.setItem(
			'player',
			JSON.stringify(customInitialState.player),
		);
		const screen = renderWithProviders(
			<MemoryRouter>
				<CreateGameForm />
			</MemoryRouter>,
		);
		const createGameInput = screen.getByRole('textbox', {
			id: 'GameName',
		});
		expect(createGameInput).toBeInTheDocument();

		user.click(createGameInput);
		// this line creates an string with content "mili"
		user.type(createGameInput, 'invalid');

		await waitFor(() => {
			expect(createGameInput).toHaveValue('invalid');
		});

		const submitButton = screen.getByRole('button', {name: /Submit/i});
		expect(submitButton).toBeInTheDocument();
		await user.click(submitButton);
		// Assert that the success message is present
	});
	test('should catch error', async () => {
		const customInitialState = {
			player: {
				name: 'Mili', // Set the desired initial state values
				id: 123,
				loged: true,
			},
		};
		window.sessionStorage.setItem(
			'player',
			JSON.stringify(customInitialState.player),
		);
		const screen = renderWithProviders(
			<MemoryRouter>
				<CreateGameForm />
			</MemoryRouter>,
		);

		const createGameInput = screen.getByRole('textbox', {
			id: 'GameName',
		});
		expect(createGameInput).toBeInTheDocument();

		userEvent.click(createGameInput);
		// this line creates an string with content "mili"
		userEvent.type(createGameInput, 'other');

		await waitFor(() => {
			expect(createGameInput).toHaveValue('other');
		});

		const submitButton = screen.getByRole('button', {name: /Submit/i});
		expect(submitButton).toBeInTheDocument();

		await userEvent.click(submitButton);

		// expect(screen.getByText(/The game cannot be created/i)).toBeInTheDocument();
	});
});
