// eslint-disable-next-line no-unused-vars
import React from 'react';
import {GameHistory} from './GameHistory';
import {render, screen} from '@testing-library/react';

describe('Game History', () => {
	test('should render the Game History component', () => {
		render(<GameHistory />);
		const title = screen.getByText(/Game Over/i);
		const subTitle = screen.getByText(/Results/i);
		const players = screen.getAllByText(/Player:*/i);
		expect(title).toBeInTheDocument();
		expect(subTitle).toBeInTheDocument();
		expect(players.length).toBeGreaterThanOrEqual(4);
		expect(players.length).toBeLessThanOrEqual(12);
	});
});
