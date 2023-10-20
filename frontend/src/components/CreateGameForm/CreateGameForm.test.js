// eslint-disable-next-line no-unused-vars
import React from 'react';
import {waitFor} from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import CreateGameForm from './CreateGameForm';
import {MemoryRouter} from 'react-router-dom';

import userEvent from '@testing-library/user-event';

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
const customInitialState = {
	player: {
		name: 'Mili', // Set the desired initial state values
		id: 123,
		loged: true,
	},
};
describe('Create Form', () => {
	test('should create game', async () => {
		jest.mock('react-router-dom', () => ({
			navigate: jest.fn(),
		}));

		const screen = renderWithProviders(
			<MemoryRouter initialEntries={['/CreateGame']} initialIndex={0}>
				<CreateGameForm />
			</MemoryRouter>,
			{
				preloadedState: customInitialState,
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

		await userEvent.click(submitButton);

		// Assert that the success message is present

		expect(
			screen.getByText(/Success: Game valid created successfully./i),
		).toBeInTheDocument();
	});

	test('shouldnt  create game', async () => {
		const customInitialState = {
			player: {
				name: 'Mili',
				id: 0,
				loged: true,
			},
		};

		const screen = renderWithProviders(
			<MemoryRouter>
				<CreateGameForm />
			</MemoryRouter>,
			{
				preloadedState: customInitialState,
			},
		);
		const createGameInput = screen.getByRole('textbox', {
			id: 'GameName',
		});
		expect(createGameInput).toBeInTheDocument();

		userEvent.click(createGameInput);
		// this line creates an string with content "mili"
		userEvent.type(createGameInput, 'invalid');

		await waitFor(() => {
			expect(createGameInput).toHaveValue('invalid');
		});

		const submitButton = screen.getByRole('button', {name: /Submit/i});
		expect(submitButton).toBeInTheDocument();

		await userEvent.click(submitButton);

		// Assert that the success message is present

		expect(
			screen.getByText(/Error The game cannot be created/i),
		).toBeInTheDocument();
	});

	test('should catch error', async () => {
		const screen = renderWithProviders(
			<MemoryRouter>
				<CreateGameForm />
			</MemoryRouter>,
			{
				preloadedState: customInitialState,
			},
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

		expect(screen.getByText(/The game cannot be created/i)).toBeInTheDocument();
	});
});

/* const obj = {
	id: 1
}

function({ obj })

{ obj : { id: 1}} */
