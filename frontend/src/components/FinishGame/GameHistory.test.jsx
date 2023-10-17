// eslint-disable-next-line no-unused-vars
import React from 'react';
import {GameHistory} from './GameHistory';
import {render, screen} from '@testing-library/react';
const test1 = {
	myPlayer: {
		name: 'mili',
		id: 1,
	},
	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: true},
	],
};
const invalidResults = {
	myPlayer: {
		name: 'mili',
		id: 1,
	},

	players: [
		{name: 'mili', id: 1, isAlive: false},
		{name: 'santi', id: 2, isAlive: false},
		{name: 'martin', id: 3, isAlive: false},
		{name: 'juan', id: 4, isAlive: false},
	],
};

const noPlayersResult = {
	myPlayer: {
		name: 'mili',
		id: 1,
	},
	players: [],
};

describe('Game History principal scenario', () => {
	test('should render the Game History and pass', () => {
		render(<GameHistory results={test1} />);
		const title = screen.getByText(/Game Over*/i);
		const subTitle = screen.getByText(/Results/i);
		const players = screen.getAllByText(/Player*/i);
		expect(title).toBeInTheDocument();
		expect(subTitle).toBeInTheDocument();
		expect(players.length).toBeGreaterThanOrEqual(4);
		expect(players.length).toBeLessThanOrEqual(12);
	});
});

describe('Game History in bad prop', () => {
	it('Passing empty array of players', () => {
		render(<GameHistory results={noPlayersResult} />);
		const title = screen.getByText(/Invalid Results/i);
		expect(title).toBeInTheDocument();
	});

	it('render with invalida data should show a popup', () => {
		render(<GameHistory results={invalidResults} />);
		const alert = screen.getByText(/Invalid Results/i);
		expect(alert).toBeInTheDocument();
	});
});

/*
});

	*/
