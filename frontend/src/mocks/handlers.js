// eslint-disable-next-line no-unused-vars
import {rest} from 'msw';
import {cardHandlers} from './cardHandlers';
import {gameHandlers} from './gameHandlers';
export const handlers = [...cardHandlers, ...gameHandlers];
