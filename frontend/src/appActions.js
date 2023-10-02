import {createAction} from '@reduxjs/toolkit';

// Definiciones de acciones
export const setPlayerName = createAction('player/setName');
export const setPlayerId = createAction('player/setId');
export const setHand = createAction('hand/setHand');
export const appendToHand = createAction('hand/appendToHand');
export const setLobby = createAction('game/setLobby');
export const appendToLobby = createAction('game/appendToLobby');
export const setCanStart = createAction('game/setCanStart');
