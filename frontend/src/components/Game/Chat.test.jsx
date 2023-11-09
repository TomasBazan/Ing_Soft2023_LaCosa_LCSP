// eslint-disable-next-line no-unused-vars
import React from 'react';
import {renderWithProviders} from '../../services/providerForTest/utils-for-tests';
import userEvent from '@testing-library/user-event';
import {Chat} from './Chat';
import {screen, waitFor} from '@testing-library/react';

// global.WebSocket = jest.fn();
jest.mock('../../__mocks__/WebSockets');
describe('Test of Chat', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('Component should render without crashing', async () => {
		jest.spyOn(global.WebSocket.prototype, 'addEventListener');
		const connection = new WebSocket('ws://localhost:');
		renderWithProviders(<Chat connection={connection} />);
	});
	it('Component should render and send a message', async () => {
		jest.spyOn(global.WebSocket.prototype, 'addEventListener');
		const connection = new WebSocket('ws://localhost:');
		const user = userEvent.setup();
		renderWithProviders(<Chat connection={connection} />);

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
	it('Component should render twice and send and see the messages', async () => {
		jest.spyOn(global.WebSocket.prototype, 'addEventListener');
		const connection = new WebSocket('ws://localhost:');
		const user = userEvent.setup();
		renderWithProviders(<Chat connection={connection} />);

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

		const connection2 = new WebSocket('ws://localhost:');
		renderWithProviders(<Chat connection={connection2} />);

		await waitFor(() => {
			expect(screen.getByText(/^Hello$/)).toBeInTheDocument();
			// add to have been called for the handle
		});
	});
});
