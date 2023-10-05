// eslint-disable-next-line no-unused-vars
import React from 'react';
import {GameHistory} from './GameHistory';
import {render, screen} from '@testing-library/react';
const test1 = {
	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: true},
	],
};

describe('Game History Happy path', () => {
	test('should render the Game History and pass', () => {
		render(<GameHistory results={test1} />);
		const title = screen.getByText(/Game Over*/i);
		// const subTitle = screen.getByText(/Results/i);
		const players = screen.getAllByText(/Player*/i);
		expect(title).toBeInTheDocument();
		// expect(subTitle).toBeInTheDocument();
		// expect(players.length).toBeGreaterThanOrEqual(4);
		// expect(players.length).toBeLessThanOrEqual(12);
		expect(players.length).toBe(4);
		// const myPlayer = screen.getByText(/pepe/i);
		// expect(myPlayer).toHaveTextContent(/Won the game*/i);
		// expect(myPlayer.id).toBe(1);
	});
});
