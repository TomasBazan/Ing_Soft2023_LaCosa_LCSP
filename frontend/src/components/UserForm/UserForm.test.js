// eslint-disable-next-line no-unused-vars
import React from 'react';
import {screen, waitFor} from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import UserForm from './UserForm';
import {BrowserRouter} from 'react-router-dom';

import userEvent from '@testing-library/user-event';

jest.mock('../request/sendPlayerName', () => {
	return {
		__esModule: true,
		default: async ({player}) => {
			player.id = 21;

			// console.log('estoy entrando en el mock');
			// console.log(player);
			if (player.name === 'username') {
				// console.log('estoy entrando por succes en el mock');
				return {
					status: undefined,
					ok: true,
					id: 21,
					name: 'username',
					detail: 'User username registered successfully',
				};
			} else if (player.name === 'username1') {
				// Simulate an error by rejecting the promise
				// console.log('estoy entrando por reject en el mock');
				return {
					status: undefined,
					ok: false,
					detail:
						'Object Player cannot be stored in the database. IntegrityError: 1062 Duplicate entry "username1" for key "player.name"',
				};
			} else {
				// Handle other cases as needed
				// console.log('estoy entrando por oytros en el mock');
				return {
					status: undefined,
					ok: false,
					detail: 'Some default error message',
				};
			}
		},
	};
});

describe('User Register Form', () => {
	test('correct renderig of User form', () => {
		renderWithProviders(
			<BrowserRouter>
				<UserForm />
			</BrowserRouter>,
		);
		const submitText = screen.getByText('Submit');
		expect(submitText).toBeInTheDocument();

		const userNameText = screen.getByText('Elige tu nickname');
		expect(userNameText).toBeInTheDocument();
	});

	test('should register', async () => {
		const user = userEvent.setup();
		const screen = renderWithProviders(
			<BrowserRouter>
				<UserForm />
			</BrowserRouter>,
		);
		const usernameInput = screen.getByRole('textbox', {
			id: 'username',
		});

		expect(usernameInput).toBeInTheDocument();
		// Focus on the input field and type the username

		user.click(usernameInput);
		user.type(usernameInput, 'username');

		// Use await waitFor to handle asynchronous updates
		await waitFor(() => {
			expect(usernameInput).toHaveValue('username');
		});
		// Click the submit button
		const submitButton = screen.getByRole('button', {name: /submit/i});
		expect(submitButton).toBeInTheDocument();

		user.click(submitButton);
		// Wait for the success message

		await waitFor(() =>
			screen.getByText(/ User username registered successfully/i),
		);

		// Assert that the success message is present
		expect(
			screen.getByText(/ User username registered successfully/i),
		).toBeInTheDocument();
	});

	test('shouldnt register', async () => {
		const user = userEvent.setup();

		const screen = renderWithProviders(
			<BrowserRouter>
				<UserForm />
			</BrowserRouter>,
		);
		const usernameInput = screen.getByRole('textbox', {
			id: 'username',
		});

		expect(usernameInput).toBeInTheDocument();
		// Focus on the input field and type the username

		user.click(usernameInput);
		user.type(usernameInput, 'username1');

		// Use await waitFor to handle asynchronous updates
		await waitFor(() => {
			expect(usernameInput).toHaveValue('username1');
		});
		// Click the submit button
		const submitButton = screen.getByRole('button', {name: /submit/i});
		expect(submitButton).toBeInTheDocument();

		try {
			user.click(submitButton);
		} catch (error) {
			// console.log('estoy entrando en el catch');
			/// /console.log(screen.debug());
			// console.log(error);
		}

		await waitFor(() =>
			screen.getByText(
				/Object Player cannot be stored in the database. IntegrityError: 1062 Duplicate entry "username1" for key "player.name"/i,
			),
		);

		// Assert that the success message is present
		expect(
			screen.getByText(
				/Object Player cannot be stored in the database. IntegrityError: 1062 Duplicate entry "username1" for key "player.name"/i,
			),
		).toBeInTheDocument();
	});
});
