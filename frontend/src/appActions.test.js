import {setPlayerName} from './appActions';

// Test cases
describe('playerSlice', () => {
	it('should create the actions properly', () => {
		const action = setPlayerName('pepe');
		expect(action.type).toBe('player/setName');
		expect(action.payload).toBe('pepe');
	});
});
