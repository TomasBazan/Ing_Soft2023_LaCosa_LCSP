// eslint-disable-next-line no-unused-vars
import React from 'react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import {Chat} from './Chat';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// When i make the fetch with websockets, mock that call

describe('Test of Chat', () => {
	it('Component should render the chat and send a message', async () => {
		const user = userEvent.setup();
		renderWithProviders(<Chat />);

		const textBox = screen.getByPlaceholderText('Type a message');
		expect(screen.getByText('Send')).toBeInTheDocument();
		expect(textBox).toBeInTheDocument();

		user.click(textBox);
		user.type(textBox, 'Hello');
		await waitFor(() => {
			expect(textBox).toHaveValue('Hello');
		});

		user.click(screen.getByText('Send'));
		await waitFor(() => {
			expect(screen.getByText(/^Hello$/)).toBeInTheDocument();
			// add to have been called for the handleEnterPress function
			expect(textBox).toHaveValue('');
		});

		user.type(textBox, 'World');
		await waitFor(() => {
			expect(screen.getByText(/^Hello$/)).toBeInTheDocument();
			expect(screen.getByText(/^World$/)).toBeInTheDocument();
		});
	});
});
